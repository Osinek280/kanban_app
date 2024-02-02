import { useRouter } from "next/navigation"
import styles from "./contextMenu.module.css"

interface ContextMenuProps {
  section: string 
  fileId: string 
  onClose: () => void
}

function ContextMenu ({section, fileId, onClose}: ContextMenuProps) {

  const router = useRouter()

  const removeSection = async () => {
    try {
      const response = await fetch(`/api/files/${fileId}/section`, {
        method: 'DELETE',
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
        onClose()
      }
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <span className={styles["context-menu"]}>
    <span 
      className={styles.item}
      onClick={() => {
        onClose()
        router.replace(`/kanban/${fileId}?add-task=true`)
      }}
    >
      Add New Task
    </span>
    <span className={styles.item} onClick={removeSection}>
      Delete
    </span>
  </span>
  )
}

export default ContextMenu;