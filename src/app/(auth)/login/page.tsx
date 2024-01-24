import Link from "next/link";
import HomeLayout from "@/app/homeLayout";
import styles from "../loginRegister.module.css";

const Login = () => {
  return (
    <HomeLayout>
      <div className={styles["login-box"]}>
        <h2>Login</h2>
        <form>
          <div className={styles["user-box"]}>
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className={styles["user-box"]}>
            <input name="password" required />
            <label>Password</label>
            <span className={styles.deputy}></span>
          </div>
          <div className={styles["remember-me"]}>
            <input type="checkbox" id="remember-me-check-box" name="rememberMe" />
            <label htmlFor="remember-me-check-box">Remember me</label>
          </div>
          <div className={styles["toggle_label"]}>
            <Link href="/register">Sign up</Link>
          </div>
          <button type="submit" className={styles["submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;