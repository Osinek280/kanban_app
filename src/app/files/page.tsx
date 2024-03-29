"use client"
import navbarStyles from "@/components/navbar.module.css"
import Link from "next/link";
import styles from "./file.module.css"
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import NewKanban from "@/components/modals/newKanban";
import { File } from "@/types";
import EmptyState from "@/components/emptyState/emptyState";
import Image from "next/image";

type Props = {
  searchParams: Record<string, string> | null | undefined;
}

const Files = ({ searchParams }: Props) => {
  const [searchValue, setSearchValue] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const showModal = searchParams?.new

  const { data: session } = useSession();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/files', {
          method: 'GET',
          headers: {
            'Authorization': `${session?.user.id}`
          }
        });
        if (!response.ok) {
          throw new Error('Błąd pobierania danych');
        }else{
          const data = await response.json();
          setFiles(data.files);
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };
    
    if (session?.user?.id) {
      fetchData();
    }else{
      setIsLoading(false)
    }
  
    return () => {
      
    };
  }, [session]); 

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return(
    <>
      {showModal && <NewKanban/>}
      <header className={navbarStyles["main-header"]}>
        <span className={navbarStyles.text}>Files</span>
        {session && 
          <>
            <span className={navbarStyles.search}>
              <input
                className={navbarStyles["search-input"]} 
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </span>
            <Link href={`/files?new=true`} className={navbarStyles["new-kanban-btn"]}>
              Add New Kanban
            </Link>
          </>}
      </header>
      {!isLoading && !files.length ? (
        <EmptyState value="No files available"/>
      ): (
        <div className={styles["files-container"]}>
        {filteredFiles.map((file, index) => (
          <Link href={`/kanban/${file._id}`} key={index} className={styles["file-con"]}>
            <div className={styles.file}>
              <span className={styles["img-box"]}>
                <Image 
                  src='/file-icon.svg'
                  alt="file-img"
                  width="150"
                  height="150"
                />
              </span>
              <span>{file.name}</span>
            </div>
          </Link>
        ))}
      </div>
      )}
    </>
  )
}

export default Files