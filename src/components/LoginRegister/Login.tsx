import { useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/LoginRegister.css'
import { useUserContext } from "../../context/UserContext";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

function LoginModal() {
  const { login } = useUserContext()
  const [passwordVisibly, setPasswordVisibly] = useState(false);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password, rememberMe } = event.currentTarget.elements as any;

    login(username.value, password.value, rememberMe.checked)

  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="user-box">
          <input type="text" name="username" required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type={passwordVisibly ? 'text' : 'password'} name="password" required />
          <label>Password</label>
          <span 
            className="deputy" 
            onClick={(e) => {
              e.preventDefault() 
              setPasswordVisibly(!passwordVisibly) 
            }}
          >
            {passwordVisibly ? <IoIosEye /> : <IoIosEyeOff />}
          </span>
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember-me-check-box" name="rememberMe" />
          <label htmlFor="remember-me-check-box">Remember me</label>
        </div>
        <div className="toggle_label">
          <Link to="/register" >Sign up</Link>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginModal;