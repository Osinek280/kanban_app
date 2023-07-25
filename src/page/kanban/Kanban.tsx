import { useParams, useNavigate, Link } from 'react-router-dom';
import './Kanban.css';
import { BsTrash3 } from 'react-icons/bs';
import { useEffect, useState, } from 'react';
import { useFileContext } from '../../context/FileContext';
import { useUserContext } from '../../context/UserContext';
import { HiDotsVertical } from 'react-icons/hi';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  subtasks: string[];
}


interface PrimaryColors {
  [key: string]: string;
}

function Kanban() {
  const { files, fetchFiles } = useFileContext();
  const { user } = useUserContext();
  const { kanbanId } = useParams();
  const navigate = useNavigate();
  const [contextIndex, setContextIndex] = useState(-1)

  const [tasks, setTasks] = useState<Task[]>([]);
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    const kanban = files.find(file => file.id === kanbanId);
    if(kanban) {
      setTasks(kanban.tasks || []);
      setSections(kanban.sections || []);
    }
  }, [files, kanbanId]);

  const primaryColors: PrimaryColors = {
    high: '#ff0000',
    medium: '#007bff',
    low: '#00aa00',
  };

  const updateSection = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, defaultValue } = event.currentTarget;

    fetch(`${process.env.API_URL}/kanban/${kanbanId}/edit-section`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: value, defaultValue: defaultValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Błąd:", error);
      });
  };  

  const handleEditRemove = (taskId: string) => {
    navigate(`/kanban/${kanbanId}/edit/${taskId}`)
  }

  const removeTask = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
    event.preventDefault();
    event.stopPropagation();

    fetch(`${process.env.API_URL}/kanban/${kanbanId}/remove-task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId: taskId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(user) {
          fetchFiles(user.id)
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Błąd:", error);
      });
  };

  const removeSection = (sectionIndex: number) => {
    fetch(`${process.env.API_URL}/kanban/${kanbanId}/remove-section`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sectionIndex: sectionIndex}),
    })
    .then((response) => response.json())
    .then((data) => {
      setContextIndex(-1)
      window.location.reload()
      console.log(data);
    })
    .catch((error) => {
      console.error("Błąd:", error);
    });
  }

  return (
    <div className="container-for-task">
      {sections.map((section, index) => (
        <div className="task-container" key={index}>
          <header className="task-container-header">
            <input
              spellCheck={false}
              className="task-container-header-input"
              defaultValue={section}
              onBlur={updateSection}
            />
            <span className="context-btn" onClick={() => {setContextIndex(index)}}>
              <HiDotsVertical />
            </span>
          </header>
          <ul className="task-list">
            {tasks.filter((task) => task.category === section).map((task, index) => (
              <li key={index}  className="task" onClick={() => {handleEditRemove(task.id)}}>
                <span 
                  style={{ color: primaryColors[task.priority] }} 
                  className="task-primary"
                >
                  {task.priority + ' Primary'}
                </span>
                <span className="task-name" style={{ fontWeight: 'normal' }}>
                  {task.title}
                </span>
                <button className="remove-task-btn" onClick={(e) => {removeTask(e, task.id)}}>
                  <BsTrash3 />
                </button>
              </li>
            ))}
          </ul>
          {contextIndex === index && (
            <>
              <span className="context-menu">
                <Link to={`/kanban/${kanbanId}/new-task`} className="item" >
                  Add New Task
                </Link>
                <span className="item" onClick={() => {removeSection(index)}}>
                  Delete
                </span>
              </span>
            </>
          )}  
        </div>
      ))}
    </div>
  );
}

export default Kanban;