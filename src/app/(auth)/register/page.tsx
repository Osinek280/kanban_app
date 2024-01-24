import Link from "next/link";
import HomeLayout from "@/app/homeLayout";
import styles from "../loginRegister.module.css";

const Register = () => {
  return (
    <HomeLayout>
      <div className={styles["register-box"]}>
        <h2>Register</h2>
        <form>
          <div className={styles["user-box"]}>
            <input
              type="text"
              name="username"
              required
            />
            <label>Username</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              type="email"
              name="email"
              required
            />
            <label>Email</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              name="password"
              required
            />
            <label>Password</label>
            <span
              className={styles.deputy}
            >
            </span>
          </div>
          <div className={styles["toggle_label"]}>
            <Link href={'/login'}>Login</Link>
          </div>
          <button type="submit" className={styles["submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Register;