import { useParams } from 'react-router-dom';
import { useFileContext } from '../../context/FileContext';
import './AddEditTask.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  subtasks: string[];
}

function EditTask() {
  const navigate = useNavigate();
  const { kanbanId, taskId } = useParams();
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [sections, setSections] = useState<string[] | undefined>(undefined);
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [priority, setPriority] = useState<string | undefined>('low')

  const priorityLevels = ['low', 'medium', 'high']

  const { files, fetchFiles } = useFileContext();
  const { user } = useUserContext();

  useEffect(() => {
    const file = files.find(file => file.id === kanbanId);
    if (file) {
      const findTask = file?.tasks.find((task: Task) => task.id === taskId)
      if(findTask) {
        setTask(findTask);
        setSubtasks(findTask.subtasks)
        setSections(file.sections);    
        setPriority(findTask.priority)
      }
    }
  }, [files, kanbanId, taskId]); 

  const removeSubtaskbyIndex = (index: number) => {
    if (task && subtasks) {
      const updatedSubtasks = [...subtasks];
      updatedSubtasks.splice(index, 1);
      setSubtasks(updatedSubtasks);
    }
  };

  const addSubtask = () => {
    if (subtasks) {
      if(subtasks.at(-1) === '') return;
      const newSubtask = ""; 
      setSubtasks([...subtasks, newSubtask]);
    }
  };  

  const saveEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, description, category } = event.currentTarget.elements as any;
  
    const editedTask = {
      id: taskId,
      title: name.value,
      description: description.value,
      subtasks: subtasks,
      priority: priority,
      category: category.value,
    };

    fetch(`${process.env.API_URL}/edit/${kanbanId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask)
    })      
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(user) {
          fetchFiles(user.id)
        }
        navigate(`/kanban/${kanbanId}`)
      })
      .catch(error => console.error(error));
  };
  

  const updateSubtask = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };
  
  return (
    <div className="form-container">
      {/* Modal Section */}
      <form className="form" onSubmit={saveEdit}>
        <h3 className="form-heading">Edit Task</h3>
        {/* Task Name */}
        <div className="form-group">
          <label className="form-label">Task Name</label>
          <input
            name='name'
            id="task-name-input"
            type="text"
            className="form-input"
            placeholder="e.g Take coffee break"
            defaultValue={task?.title}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name='description'
            id="task-description-input"
            className="form-textarea"
            placeholder="e.g. It's always good to take a break..."
            defaultValue={task?.description}
          />
        </div>

        {/* Subtasks */}
        <div className="form-group">
          <label className="form-label">Subtasks</label>
          <div className='subtask-container'>
            {subtasks?.map((item, index) => (
              <div className='subtask' key={index}>
                <input
                type='text'
                className='form-input subtask-input'
                placeholder="e.g Take coffee break"
                defaultValue={item}
                onChange={(e) => {updateSubtask(index, e.target.value)}}
                spellCheck={false}
              />
              <button 
                className='remove-subtask-btn'
                onClick={(e) => {
                  e.preventDefault()
                  removeSubtaskbyIndex(index)
                }}
              >X</button>
              </div>
            ))}
          </div>
        </div>
        <button 
          className="add-subtask-button" 
          onClick={(e) => {
            e.preventDefault()
            addSubtask()
          }}
        >
          Add New Subtask
        </button>
        
        {/* Priority */}
        <div className="form-group">
          <label className="form-label">Priority</label>
          <div className="priority-container">
            {priorityLevels.map((item, index) => (
              <span className="priority" key={index}>
                <label className="priority-label" htmlFor="low">
                  {item.charAt(0).toUpperCase() + item.slice(1)} Priority
                </label>
                <input
                  className="priority-input"
                  type="checkbox"
                  checked={priority === item}
                  onChange={() => {setPriority(item)}}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="form-group" id="current-status-group">
          <label className="form-label">Current Status</label>
          <select className="form-select" defaultValue={task?.category} name='category'>
            {sections?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <button className="form-submit-button">Save Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;