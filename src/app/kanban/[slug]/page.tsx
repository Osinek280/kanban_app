"use client"
import styles from "./kanban.module.css";
import { useState, useEffect } from "react";
import navbarStyles from "@/components/navbar.module.css";
import Link from "next/link";
import AddTask from "@/components/modals/addTask";
import EditTask from "@/components/modals/EditTask";
import AddSection from "@/components/modals/addSection";
import { HiDotsVertical } from 'react-icons/hi';
import { BsTrash3 } from 'react-icons/bs';
import { File, Task, PrimaryColors } from "@/types";
import ContextMenu from "@/components/contextMenu/contextMenu";
import { useCallback } from "react";
import EmptyState from "@/components/emptyState/emptyState";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useSession } from "next-auth/react";

type Props = {
  params: any;
  searchParams: Record<string, string> | null | undefined;
};

const Kanban = ({ params, searchParams }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const newTaskModal = searchParams?.["add-task"];
  const newSectionModal = searchParams?.["add-section"];
  const editTaskModal = searchParams?.edit;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [task, setTask] = useState<Task | undefined>(undefined);

  const [contextIndex, setContextIndex] = useState(-1);

  const { data: session } = useSession();

  const primaryColors: PrimaryColors = {
    high: '#ff0000',
    medium: '#007bff',
    low: '#00aa00',
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/files/${params.slug}`, {
        headers: {
          'Authorization': `${session?.user.id}`
        },
      });
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Błąd pobierania danych');
      } else {
        const data = await response.json();
        setFile(data.file);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  }, [params.slug, session?.user.id]);

  const removeTask = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch(`/api/files/${params.slug}/task`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: taskId
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        console.log(message);
      } else {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateSection = async (section: string, index: number) => {
    try {
      const response = await fetch(`/api/files/${params.slug}/section`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          section: section,
          index: index
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        console.log(message);
      } else {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      // Clean-up function
    };
  }, [params, contextIndex, fetchData]);

  useEffect(() => {
    if (file) {
      setTask(file?.tasks.find((el: Task) => el._id === editTaskModal));
    }
  }, [editTaskModal, file]);

  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) {
      return;
    }
    
    const sectionName = file && file.sections[parseInt(destination.droppableId)];

    console.log(draggableId)
    console.log(sectionName)
    
    if(file) {

      const updateTasks = file.tasks.map((task: Task) => {
        if (task._id === draggableId) {
          return {
              ...task,
              category: sectionName
          };
      }
      return task;
      })

      setFile({
        ...file,
        tasks: updateTasks
      });
    }

    try {
      const response = await fetch(`/api/files/${params.slug}/task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: draggableId,
          newSection: sectionName
        }),
      });

      if (!response.ok) {
        throw new Error('Błąd pobierania danych');
      }

    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      {contextIndex !== -1 && (
        <div
          className={styles.container}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setContextIndex(-1);
            }
          }}
        ></div>
      )}
      {editTaskModal &&
        <EditTask
          task={task}
          sections={file?.sections}
          taskId={editTaskModal}
          fileId={params.slug}
        />
      }
      {newTaskModal &&
        <AddTask
          file={file}
          fileId={params.slug}
        />
      }
      {newSectionModal &&
        <AddSection
          fileId={params.slug}
        />
      }
      <header className={navbarStyles["main-header"]}>
        <span className={navbarStyles.text}>{file?.name ? file?.name : 'File'}</span>
        <Link href={`/kanban/${params.slug}?add-task=true`} className={navbarStyles["new-task-btn"]}>
          Add New Task
        </Link>
        <Link href={`/kanban/${params.slug}?add-section=true`} className={navbarStyles["new-section-btn"]}>
          Add New Section
        </Link>
      </header>
      <div className={styles["container-for-task"]}>
        {!isLoading && !file?.sections.length ? (
          <EmptyState value="No sections available" />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            {file?.sections.map((section, index) => (
              <div className={styles["task-container"]} key={index}>
                <header className={styles["task-container-header"]}>
                  <input
                    spellCheck={false}
                    className={styles["task-container-header-input"]}
                    defaultValue={section}
                    onBlur={(e) => updateSection(e.target.value, index)}
                  />
                  <span className="context-btn" onClick={() => setContextIndex(index)}>
                    <HiDotsVertical />
                  </span>
                </header>
                <ul className={styles["task-list"]}>
                  <Droppable droppableId={index.toString()} key={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {file?.tasks
                          .filter((task) => task.category === section)
                          .map((task, taskIndex) => (
                            <Draggable
                              key={task._id}
                              draggableId={task._id}
                              index={taskIndex}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Link href={`/kanban/${params.slug}?edit=${task._id}`} key={index} className={styles.task}>
                                    <span
                                      style={{ color: primaryColors[task.priority] }}
                                      className={styles["task-primary"]}
                                    >
                                      {task.priority + ' Primary'}
                                    </span>
                                    <span className={styles["task-name"]}>
                                      {task.title}
                                    </span>
                                    <button
                                      className={styles["remove-task-btn"]}
                                      onClick={(e) => { removeTask(e, task._id) }}
                                    >
                                      <BsTrash3 />
                                    </button>
                                  </Link>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </ul>
                {contextIndex === index && (
                  <>
                    <ContextMenu
                      section={section}
                      fileId={params.slug}
                      onClose={() => setContextIndex(-1)}
                    />
                  </>
                )}
              </div>
            ))}
          </DragDropContext>

        )}
      </div>
    </>
  );
};

export default Kanban;