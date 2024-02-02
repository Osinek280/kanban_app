"use client"
import styles from "./log-out.module.css";
import navbarStyles from "@/components/navbar.module.css"
import HomeLayout from "@/app/homeLayout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LogOut = () => {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <>
      <header className={navbarStyles["main-header"]}>
        <span className={navbarStyles.text}>See you! {session?.user?.name}</span>
      </header>
      <HomeLayout>
        <div className={styles["log-out-box"]}>
          <div className={styles.heading}>Oh no! You&apos;re leaving... Are you sure?</div>
          <button
            className={`${styles.btn} ${styles['btn-cancel']}`}
            onClick={(e) => {
              e.preventDefault();
              router.replace("/");
            }}
          >
            Naah, Just Kidding
          </button>
          <button className={styles.btn} onClick={() => { signOut({callbackUrl: '/'}) }}>
            Log out
          </button>
        </div>
      </HomeLayout>
    </>
  );
}

export default LogOut;
