import styles from "./contextMenu.module.css"
import Link from "next/link"

function ContextMenu ({section, fileId, onClose}: {section: string, fileId: string, onClose: () => void}) {

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
    <Link href={`/`} className={styles.item}>
      Add New Task
    </Link>
    <span className={styles.item} onClick={removeSection}>
      Delete
    </span>
  </span>
  )
}

export default ContextMenu;