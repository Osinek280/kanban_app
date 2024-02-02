import Image from "next/image";
import styles from "./home.module.css"
import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className={styles['home-container']}>
      <header className={styles["home-header"]}>What do you want to do today?</header>
      <div className={styles.container}>
        <div className={styles["kanban-state"]}>
          <span className={styles["kanban-state-text"]}>Kanban</span>
          <Image
            src="/kanban-image.svg"
            alt=""
            width="500"
            height="350"
            priority={true}
          />
        </div>
        <div className={styles["home-right-side"]}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;