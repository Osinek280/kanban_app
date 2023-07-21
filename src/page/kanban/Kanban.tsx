import { useParams } from 'react-router-dom';
import './Kanban.css';
import { BsTrash3 } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useFileContext } from '../../context/FileContext';

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
  const { files } = useFileContext();
  const { id } = useParams();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    const kanban = files.find(file => file.id === id);
    setTasks(kanban.tasks || []);
    setSections(kanban.sections || []);
  }, [files, id]);

  const primaryColors: PrimaryColors = {
    high: '#ff0000',
    medium: '#007bff',
    low: '#00aa00',
  };

  return (
    <div className="container-for-task">
      {sections.map((section, index) => (
        <div className="task-container" key={index}>
          <header className="task-container-header">
            <input
              spellCheck={false}
              className="task-container-header-input"
              defaultValue={section}
            />
            <span className="context-btn"></span>
          </header>
          <ul className="task-list">
            {tasks.filter((task) => task.category === section).map((task, index) => (
              <span key={index}>
                <li className="task">
                  <span 
                    style={{ color: primaryColors[task.priority] }} 
                    className="task-primary"
                  >
                    {task.priority + ' Primary'}
                  </span>
                  <span className="task-name" style={{ fontWeight: 'normal' }}>
                    {task.title}
                  </span>
                  <button className="remove-task-btn">
                    <BsTrash3 />
                  </button>
                </li>
              </span>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Kanban;