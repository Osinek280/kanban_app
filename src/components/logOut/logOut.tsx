import './LogOut.css';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    const LogOut = () => {
      localStorage.removeItem("token");
      navigate('/home')
    }

    const canel = () => {
        navigate('/home')
    }

    return(
        <div className='form-container'>
            <form className='form' style={{gap: 0}}>
                <h2>Logout Confirmation</h2>
                <p>Are you sure you want to log out?</p>
                <div className='button-group'>
                    <button onClick={LogOut}>Logout</button>
                    <button onClick={canel}>Cancel</button>
                </div>
            </form>    
        </div>
    )
}

export default LogOut;