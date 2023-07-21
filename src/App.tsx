import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/Home.css';
import Sidebar from './components/SideBar/SideBar';
import Navbar from './components/NavBar/NavBar';
import Kanban from './page/kanban/Kanban';
import LoginModal from './components/LoginRegister/Login';
import RegisterModal from './components/LoginRegister/Register';
import { UserProvider } from './context/UserContext';
import { FileProvider } from './context/FileContext';
import Home from './page/home/Home';

const kanbanDescription = (
  <div className='kanban-description'>
    <h2 className='kanban-description-header'>What is Kanban Method?</h2>
    <p>
      The Kanban Method is a means to design, manage, and improve flow systems for knowledge work.
      The method also allows organizations to start with their existing workflow and drive evolutionary change.
      They can do this by visualizing their flow of work, limit work in progress (WIP), and stop starting and start finishing.
    </p>
    <div className='login-register-btn-container'>
      Start now:
      <div className='button-container'>
        <Link to='/login' className='login-btn'>Login</Link>
        <Link to='/register' className='register-btn'>Register</Link>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <FileProvider>
          <UserProvider>
            <Sidebar />
            <div className='container'>
              <Navbar />
              <Routes>
                <Route
                  path='/'
                  element={<Home children={kanbanDescription} />}
                />
                <Route
                  path='/home'
                  element={<Home children={kanbanDescription} />}
                />
                <Route
                  path='/login'
                  element={<Home children={<LoginModal />} />}
                />
                <Route
                  path='/register'
                  element={<Home children={<RegisterModal />} />}
                />
                <Route path='/kanban' element={'nie znaleziono wybranego Kanbanu'} />
                <Route path='/kanban/:id' element={<Kanban />} />
                <Route path='/files' element={'files'} />
              </Routes>
            </div>
          </UserProvider>
        </FileProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;