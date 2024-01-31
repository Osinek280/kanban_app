import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBook, faArrowRightFromBracket, faFile } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from "./sidebar.module.css"
import { MdLogin } from 'react-icons/md'

const Sidebar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.icon}>
        <FontAwesomeIcon icon={faHome} className={styles["my-icon"]} />
        <span className={styles["tool-tip-text"]}>Home</span>
      </Link>
      <Link href="/" className={styles.icon}>
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
      {/* {files.length !== 0 && <span className='vertical-line'></span>} */}
      <Link href={'/log-out'} className={styles["HUJ"]}>
        <MdLogin />
      </Link>
    </nav>
  );
};

export default Sidebar;

