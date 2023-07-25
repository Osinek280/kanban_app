import { useEffect, useState } from "react";
import { useFileContext } from "../../context/FileContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

function AddTask() {
  const navigate = useNavigate();
  const { kanbanId } = useParams();
  const [sections, setSections] = useState<string[] | undefined>(undefined);
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [priority, setPriority] = useState<string | undefined>('low')

  const priorityLevels = ['low', 'medium', 'high']

  const { files, fetchFiles } = useFileContext();
  const { user } = useUserContext();

  useEffect(() => {
    const file = files.find(file => file.id === kanbanId);
    if(file) {
      setSections(file.sections)
    }
  }, [files, kanbanId])

  const removeSubtaskbyIndex = (index: number) => {
    if (subtasks) {
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
  
  const updateSubtask = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const saveEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, description, category } = event.currentTarget.elements as any;
  
    const editedTask = {
      title: name.value,
      description: description.value,
      subtasks: subtasks,
      priority: priority,
      category: category.value,
    };

    fetch(`${process.env.API_URL}/new-task/${kanbanId}`, {
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
  
  return (
    <div className="form-container">
      {/* Modal Section */}
      <form className="form" onSubmit={saveEdit}>
        <h3 className="form-heading">Add New</h3>
        {/* Task Name */}
        <div className="form-group">
          <label className="form-label">Task Name</label>
          <input
            name='name'
            id="task-name-input"
            type="text"
            className="form-input"
            placeholder="e.g Take coffee break"
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
          <select className="form-select" name="category">
            {sections?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <button className="form-submit-button">Create Task</button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;