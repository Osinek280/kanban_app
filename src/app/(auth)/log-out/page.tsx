"use client"
import { signOut } from "next-auth/react";

const logOut = () => {
  return(
    <>
      <button onClick={() => {signOut()}}>
        Log out
      </button>
    </>
  )
}

export default logOut;