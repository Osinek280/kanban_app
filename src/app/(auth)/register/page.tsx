"use client"
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import HomeLayout from "@/app/homeLayout";
import styles from "../loginRegister.module.css";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import navbarStyles from "@/components/navbar.module.css"

const Register = () => {
  const [passwordVisibly, setPasswordVisibly] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password}),
      });

      if (response.ok) {
        // Obsługa pozytywnej odpowiedzi
        console.log('Dane zostały wysłane pomyślnie!');
      } else {
        // Obsługa błędu
        console.error('Wystąpił błąd podczas wysyłania danych.');
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };

  return (
    <>
      <header className={navbarStyles["main-header"]}>
        <span className={navbarStyles.text}>Hello</span>
      </header>
      <HomeLayout>
        <div className={styles["register-box"]}>
          <h2>Register</h2>
          <form onSubmit={onSubmit}>
            <div className={styles["user-box"]}>
              <input
                type="text"
                name="username"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Username</label>
            </div>
            <div className={styles["user-box"]}>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <div className={styles["user-box"]}>
              <input
                name="password"
                type={passwordVisibly ? 'text' : 'password'}
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
            <div className={styles["toggle_label"]}>
              <Link href={'/login'}>Login</Link>
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

export default Register;