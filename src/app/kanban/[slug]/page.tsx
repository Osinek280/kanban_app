"use client"
import styles from "./kanban.module.css"
import { useState, useEffect } from "react";
import { PageProps } from "../../../../.next/types/app/layout";

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  subtasks: string[];
}

interface File {
  id: string;
  name: string;
  ownerId: string;
  sections: string[];
  tasks: Task[];
}

interface pageProps {
  params: { slug: string }
}

interface PrimaryColors {
  [key: string]: string;
}

const Kanban = ({ params }: PageProps) => {

  const [file, setFile] = useState<File | null>(null)

  const primaryColors: PrimaryColors = {
    high: '#ff0000',
    medium: '#007bff',
    low: '#00aa00',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/files/${params.slug}`);
        if (!response.ok) {
          throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        console.log(data.file)
        setFile(data.file)
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };
  
    fetchData(); 
  
    return () => {
      
    };
  }, []);

  return(
    <div className={styles["container-for-task"]}>
      {file?.sections.map((section, index) => (
        <div className={styles["task-container"]} key={index}>
          <header className={styles["task-container-header"]}>
            <input
                spellCheck={false}
                className={styles["task-container-header-input"]}
                defaultValue={section}
            />
          </header>
          <ul className={styles["task-list"]}>
              {file?.tasks
                .filter((task) => task.category === section)
                .map((task, index) => (
                  <li key={index} className={styles.task}>
                    <span
                      style={{ color: primaryColors[task.priority] }}
                      className={styles["task-primary"]}
                    >
                      {task.priority + ' Primary'}
                    </span>
                    <span className={styles["task-name"]} style={{ fontWeight: 'normal' }}>
                      {task.title}
                    </span>
                  </li>
                ))}
            </ul>
      </div>
      ))}
    </div>
  )
}

export default Kanban