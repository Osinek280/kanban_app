"use client"
import { useState, FormEvent } from "react";
import Link from "next/link";
import HomeLayout from "@/app/homeLayout";
import styles from "../loginRegister.module.css";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import navbarStyles from "@/components/navbar.module.css"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [passwordVisibly, setPasswordVisibly] = useState(false);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const res = await signIn('credentials', {
        email, 
        password,
        redirect: false,
      })

      if (res && res.error) {
        setError("Invalid details")
        return;
      }

      router.replace('/')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <header className={navbarStyles["main-header"]}>
        <span className={navbarStyles.text}>Hello</span>
      </header>
      <HomeLayout>
        <div className={styles["login-box"]}>
          <h2>Login</h2>
          <form onSubmit={onSubmit}>
            <div className={styles["user-box"]}>
              <input
                type="text" 
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <label>Email</label>
            </div>
            <div className={styles["user-box"]}>
              <input 
                name="password" 
                onChange={(e) => setPassword(e.target.value)}
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
            {error && (
              <div className={styles["error-box"]}>
                <p className={styles["error-message"]}>{error}</p>
              </div>
            )}
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