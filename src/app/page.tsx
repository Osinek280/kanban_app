import HomeLayout from "./homeLayout";
import styles from "./home.module.css"
import Link from 'next/link';

const Home = () => {
  return (
    <HomeLayout>
      <div className={styles["kanban-description"]}>
        <h2 className={styles["kanban-description-header"]}>What is Kanban Method?</h2>
        <p>
          The Kanban Method is a means to design, manage, and improve flow systems for knowledge work.
          The method also allows organizations to start with their existing workflow and drive evolutionary change.
          They can do this by visualizing their flow of work, limit work in progress (WIP), and stop starting and start finishing.
        </p>
        <div className={styles["login-register-btn-container"]}>
          Start now:
          <div className={styles["button-container"]}>
            <Link href='/login' className={styles["login-btn"]}>Login</Link>
            <Link href='/register' className={styles["register-btn"]}>Register</Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
