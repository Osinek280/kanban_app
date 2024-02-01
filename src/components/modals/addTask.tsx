import styles from "./Modals.module.css"
import { useRouter } from "next/navigation";

interface Task {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  subtasks: string[];
}

interface File {
  _id: string;
  name: string;
  ownerId: string;
  sections: string[];
  tasks: Task[];
}

interface AddTaskProps {
  file: File | null;
}

function AddTask({ file }: AddTaskProps) {
  const router = useRouter()

  console.log(file)
  
  return (
    <div 
      className={styles["form-container"]}
      onClick={(e) => {
        if(e.target === e.currentTarget) {
          router.back()
        }
      }}
    >
      {/* Modal Section */}
      <form className={styles.form}>
        <h3 className={styles["form-heading"]}>Add New</h3>
        {/* Task Name */}
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]}>Task Name</label>
          <input
            name='name'
            id="task-name-input"
            type="text"
            className={styles["form-input"]}
            placeholder="e.g Take coffee break"
          />
        </div>

        {/* Description */}
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]}>Description</label>
          <textarea
            name='description'
            id="task-description-input"
            className={styles["form-textarea"]}
            placeholder="e.g. It's always good to take a break..."
          />
        </div>

        {/* Subtasks */}
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]}>Subtasks</label>
          <div className={styles["subtask-container"]}>
            {/* {subtasks?.map((item, index) => (
              <div className='subtask' key={index}>
                <input
                type='text'
                className='form-input subtask-input'
                placeholder="e.g Take coffee break"
                defaultValue={item}
                spellCheck={false}
              />
              <button 
                className='remove-subtask-btn'

              >X</button>
              </div>
            ))} */}
          </div>
        </div>
        <button 
          className={styles["add-subtask-button"]} 
        >
          Add New Subtask
        </button>
        
        {/* Priority */}
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]}>Priority</label>
          <div className={styles["priority-container"]}>
            {/* {priorityLevels.map((item, index) => (
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
            ))} */}
          </div>
        </div>

        {/* Current Status */}
        <div className={styles["form-group"]} id="current-status-group">
          <label className={styles["form-label"]}>Current Status</label>
          <select className={styles["form-select"]} name="category">
            {file?.sections?.map((item: string, index: number) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <button className={styles["form-submit-button"]}>Create Task</button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;