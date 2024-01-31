import styles from "./Modals.module.css"
import { useRouter } from "next/navigation";

function NewKanban () {
  const router = useRouter()

  return(
    <div 
      className={styles["form-container"]}
      onClick={(e) => {
        if(e.target === e.currentTarget) {
          router.back()
        }
      }}
    >
      <form className={styles.form}>
        <button 
          className={styles["close-btn"]} 
          onClick={(e) => {
            e.preventDefault();
            router.back()
          }}
        >
          x
        </button>
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} style={{ marginBottom: "3px" }}>
            Kanban Name
          </label>
          <input
            id="section-name-input"
            type="text"
            className={styles["form-input"]}
            placeholder="e.g Take coffee break"
            name="kanban"
          />
          <button
            className={styles["form-submit-button"]}
          >
            Add new Kanban
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewKanban;