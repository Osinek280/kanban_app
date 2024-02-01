import { useState, useEffect } from "react";
import styles from "./Modals.module.css"
import { useRouter } from "next/navigation";
import { Priority, EditTaskProps, priorityLevels } from "@/types";

function EditTask({ task, sections, taskId, fileId }: EditTaskProps) {
  const [title, setTitle] = useState<string | undefined>("")
  const [description, setDescription] = useState<string | undefined>("")
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [priority, setPriority] = useState<Priority | undefined>("low")
  const [subtasks, setSubtasks] = useState<string[]>([])

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (title !== undefined && /^\s+$/.test(title)) {
      return;
    }  

    try {
      const response = await fetch(`/api/files/${fileId}/task`, {
        method: 'PATCH',
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
          id: taskId
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

  useEffect(() => {
    const setData = () => {
      setTitle(task?.title)
      setDescription(task?.description)

      setPriority(task?.priority)
      setCategory(task?.category)

      if(task?.subtasks) {
        setSubtasks(task?.subtasks)
      }
    }

    if(task) {
      setData()
    }
  
    return () => {
      
    };
  }, [task, sections]); 
    
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
        <h3 className={styles["form-heading"]}>Edit Task</h3>
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
                  spellCheck={false}
                  value={item}
                  onChange={(e) => {
                    const updatedSubtasks = [...subtasks];
                    updatedSubtasks[index] = e.target.value;
                    setSubtasks(updatedSubtasks);
                  }}
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
            name='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          > 
            {sections?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <button className={styles["form-submit-button"]}>Save Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;