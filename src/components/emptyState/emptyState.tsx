import styles from "./emptyState.module.css"
import { useSession } from "next-auth/react";
import Image from "next/image";

function EmptyState({value}: { value?: string }) { 
  const { data: session } = useSession();

  return (
    <div className={styles["empty-state-container"]}>
      <div className={styles["empty-state"]}>
        <span className={styles["empty-state-text"]}>
          {session ? value : 
            'You need to be logged in to access this part of the application'}
        </span>
        <Image
          src="/empty-state.svg"
          alt="empty-state-img"
          width="450"
          height="350"
        />
      </div>
    </div>
  );
}

export default EmptyState;
