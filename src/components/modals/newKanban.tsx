import { useState } from "react";
import styles from "./Modals.module.css"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function NewKanban () {
  const [name, setName] = useState("")

  const { data: session } = useSession();
  const router = useRouter()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (/^\s+$/.test(name)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/files/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          file: {
            owner: session?.user.id,
            name: name,
            sections: [],
            tasks: []
          }
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

  return(
    <div 
      className={styles["form-container"]}
      onClick={(e) => {
        if(e.target === e.currentTarget) {
          router.back()
        }
      }}
    >
      <form className={styles.form} onSubmit={onSubmit}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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