"use client"
import styles from "./kanban.module.css";
import { useState, useEffect } from "react";
import navbarStyles from "@/components/navbar.module.css"
import Link from "next/link";
import AddTask from "@/components/modals/addTask";
import EditTask from "@/components/modals/EditTask";
import { File, Task, PrimaryColors } from "@/types";

type Props = {
  params: any
  searchParams: Record<string, string> | null | undefined;
}

const Kanban = ({ params, searchParams }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const newTaskModal = searchParams?.["add-task"]
  const newSectionModal = searchParams?.["add-section"]
  const editTaskModal = searchParams?.edit

  const [task, setTask] = useState<Task | undefined>(undefined)

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
        setFile(data.file);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();

    return () => {
      // Clean-up function
    };
  }, [searchParams]);

  useEffect(() => {
    if(file) {
      setTask(file?.tasks.find((el: Task) => el._id === editTaskModal))
    }
  }, [editTaskModal, file])

  return (
    <>
      {editTaskModal && <EditTask task={task} sections={file?.sections} taskId={editTaskModal} fileId={params.slug}/>}
      {newTaskModal && <AddTask file={file} fileId={params.slug}/>}
      {newSectionModal && <>section</>}
      <header className={navbarStyles["main-header"]}>
        <span className={navbarStyles.text}>{file?.name}</span>
        <Link href={`/kanban/${params.slug}?add-task=true`} className={navbarStyles["new-task-btn"]}>
            Add New Task
        </Link>
        <Link href={`/kanban/${params.slug}?add-section=true`} className={navbarStyles["new-section-btn"]}>
          Add New Section
        </Link>
      </header>
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
                  <Link href={`/kanban/${params.slug}?edit=${task._id}`} key={index} className={styles.task}>
                    <span
                      style={{ color: primaryColors[task.priority] }}
                      className={styles["task-primary"]}
                    >
                      {task.priority + ' Primary'}
                    </span>
                    <span className={styles["task-name"]} style={{ fontWeight: 'normal' }}>
                      {task.title}
                    </span>
                  </Link>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Kanban;
