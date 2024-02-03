"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBook, faArrowRightFromBracket, faFile } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from "./sidebar.module.css"
import { MdLogin } from 'react-icons/md'
// import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { File } from '@/types';

const Sidebar = () => {
  const [files, setFiles] = useState<File[]>([])

  // const { data: session } = useSession();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/files', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `${session?.user.id}`
  //         }
  //       });
  //       if (!response.ok) {
  //         throw new Error('Błąd pobierania danych');
  //       }else{
  //         const data = await response.json();
  //         setFiles(data.files);
  //       }
  //     } catch (error) {
  //       console.error('Błąd podczas pobierania danych:', error);
  //     }
  //   };
    
  //   if (session?.user?.id) {
  //     fetchData();
  //   }
  
  //   return () => {
      
  //   };
  // }, [session]); 

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.icon}>
        <FontAwesomeIcon icon={faHome} className={styles["my-icon"]} />
        {/* <BsHouseDoor className={styles["my-icon"]} /> */}
        <span className={styles["tool-tip-text"]}>Home</span>
      </Link>
      <Link href="/files" className={styles.icon}>
        <FontAwesomeIcon icon={faSearch} className={styles["my-icon"]} />
        <span className={styles["tool-tip-text"]}>Search</span>
      </Link>
      <Link href="/files" className={styles.icon}>
        <FontAwesomeIcon 
          icon={faBook} 
          className={styles["my-icon"]} 
        />
        <span className={styles["tool-tip-text"]}>Library</span>
      </Link>

      {files && files.length !== 0 && <span className={styles["vertical-line"]}></span>}

      {files && files.map((file, index) => (
        <Link key={index} href={`/kanban/${file?._id}`} className={styles.icon}>
          <IoDocumentTextOutline />
          <p>{file.name}</p>
        </Link>
      ))}

      {/* {session && 
        <Link href={'/log-out'} className={styles["log-out-btn"]}>
          <MdLogin />
        </Link>} */}
    </nav>
  );
};

export default Sidebar;

