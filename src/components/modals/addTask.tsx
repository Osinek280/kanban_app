import styles from "./Modals.module.css"
import { useRouter } from "next/navigation";
import { useState } from "react";

type Priority = "low" | "medium" | "high"

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
  fileId: string
}

function AddTask({ file, fileId }: AddTaskProps) {
  const [title, setTitle] = useState<string | undefined>("")
  const [description, setDescription] = useState<string | undefined>("")
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [priority, setPriority] = useState<Priority | undefined>("low")
  const [subtasks, setSubtasks] = useState<string[]>([])
  const router = useRouter()

  const priorityLevels: Priority[] = ['low', 'medium', 'high']

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(`/api/files/${fileId}/new-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: {
            title, 
            description,
            category,
            priority,
            subtasks
          },
        }),
      });
      if(!response.ok) {
        const { message } = await response.json()
        console.log(message)
      }else {
        router.back()
      }
    } catch (error) {
      console.error(error);
    }
  }
  
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
      <form className={styles.form} onSubmit={onSubmit}>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Subtasks */}
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]}>Subtasks</label>
          <div className={styles["subtask-container"]}>
            {subtasks?.map((item, index) => (
              <div className={styles.subtask} key={index}>
                <input
                  type='text'
                  className={styles["form-input"]}
                  placeholder="e.g Take coffee break"
                  defaultValue={item}
                  spellCheck={false}
                />
                <button 
                  className={styles["remove-subtask-btn"]}
                  onClick={(e) => {
                    e.preventDefault();
                    // Filtrujemy tablicę, aby usunąć element o odpowiednim indeksie
                    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
                    setSubtasks(updatedSubtasks);
                  }}
                >X</button>
              </div>
            ))}
          </div>
        </div>
        <button 
          className={styles["add-subtask-button"]} 
          onClick={(e) => {
            e.preventDefault()
            if(subtasks[subtasks.length - 1] === '') return;
            setSubtasks([...subtasks, ''])            
          }}
        >
          Add New Subtask
        </button>
        
        {/* Priority */}
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]}>Priority</label>
          <div className={styles["priority-container"]}>
            {priorityLevels.map((item, index) => (
              <span className={styles.priority} key={index}>
                <label className={styles["priority-label"]}>
                  {item.charAt(0).toUpperCase() + item.slice(1)} Priority
                </label>
                <input
                  className={styles["priority-input"]}
                  type="checkbox"
                  checked={priority === item}
                  onChange={() => {setPriority(item)}}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className={styles["form-group"]} id="current-status-group">
          <label className={styles["form-label"]}>Current Status</label>
          <select 
            className={styles["form-select"]} 
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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