"use client"
import navbarStyles from "@/components/navbar.module.css"
import Link from "next/link";
import styles from "./file.module.css"
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

interface Task {
  id: string;
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


const Files = () => {
  const [files, setFiles] = useState<File[]>([])

  const { data: session } = useSession();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/files', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${"userId"}`
          }
        });
        if (!response.ok) {
          throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        console.log(typeof data.files)
        setFiles(data.files);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };
  
    fetchData(); 
  
    return () => {
      
    };
  }, []); 

  console.log(files)
  

  return(
    <>
      <header className={navbarStyles["main-header"]}>
        <span className={navbarStyles.text}>Files</span>
        <span className={navbarStyles.search}>
          <input
            className={navbarStyles["search-input"]} 
            placeholder="Search"
          />
        </span>
        <Link href={`/files/new`} className={navbarStyles["new-kanban-btn"]}>
            Add New Kanban
        </Link>
      </header>
      <div className={styles["files-container"]}>
      {files.map((file, index) => (
        <Link href={`/kanban/${file._id}`} key={index} className={styles["file-con"]}>
          <div className={styles.file}>
            <span className={styles["img-box"]}>
                <img src='/file-icon.svg' alt="file-img" />
            </span>
            <span>{file.name}</span>
          </div>
        </Link>
      ))}
      </div>
    </>
  )
}

export default Files