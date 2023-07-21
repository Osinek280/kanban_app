import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

function RegisterModal() {
  const [passwordVisibly, setPasswordVisibly] = useState(false);

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, email, password } = event.currentTarget.elements as any;

    const registerData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    console.log(registerData)
  };

  return (
    <div className="register-box">
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="email"
            name="email"
            required
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type={passwordVisibly ? 'text' : 'password'}
            name="password"
            required
          />
          <label>Password</label>
          <button 
            className="deputy" 
            onClick={(e) => {
              e.preventDefault() 
              setPasswordVisibly(!passwordVisibly) 
            }}
          >
            {passwordVisibly ? <IoIosEye /> : <IoIosEyeOff />}
          </button>
        </div>
        <div className="toggle_label">
          <Link to={'/login'}>Login</Link>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterModal;