"use client"
import { useState } from "react";
import Link from "next/link";
import HomeLayout from "@/app/homeLayout";
import styles from "../loginRegister.module.css";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import navbarStyles from "@/components/navbar.module.css"

const Login = () => {
  const [passwordVisibly, setPasswordVisibly] = useState(false);

  return (
    <>
      <header className={navbarStyles["main-header"]}>
        <span className={navbarStyles.text}>Hello</span>
      </header>
      <HomeLayout>
        <div className={styles["login-box"]}>
          <h2>Login</h2>
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
                name="password" 
                required 
              />
              <label>Password</label>
              <span
                className={styles.deputy}
                onClick={(e) => {
                  e.preventDefault(); 
                  setPasswordVisibly(!passwordVisibly); 
                }}
              >
                {passwordVisibly ? <IoIosEye /> : <IoIosEyeOff />}
              </span>
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
    </>
  );
};

export default Login;