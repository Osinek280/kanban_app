import { useState } from "react";
import styles from "./Modals.module.css"
import { useRouter } from "next/navigation";
import { AddSectionProps } from "@/types";

function AddSection ({fileId}: AddSectionProps) {
  const [section, setSection] = useState("")

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(section === '') return

    try {
      const response = await fetch(`/api/files/${fileId}/section`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          section: section
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
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles["form-group"]}>
          <label className={styles["form-label"]} style={{ marginBottom: "3px" }}>
            Section Name
          </label>
          <input
            id="section-name-input"
            type="text"
            className={styles["form-input"]}
            placeholder="e.g Take coffee break"
            name="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
          <button
            className={styles["form-submit-button"]}
          >
            Add new Section
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSection;