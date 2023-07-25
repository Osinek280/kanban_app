import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/Home.css';
import Sidebar from './components/SideBar/SideBar';
import Navbar from './components/NavBar/NavBar';
import Kanban from './page/kanban/Kanban';
import LoginModal from './components/LoginRegister/Login';
import RegisterModal from './components/LoginRegister/Register';
import EditTask from './components/AddEditTask/EditTask';
import { UserProvider } from './context/UserContext';
import { FileProvider } from './context/FileContext';
import Home from './page/home/Home';
import AddTask from './components/AddEditTask/AddTask';
import NewSection from './components/NewSection/NewSection';
import NewKanban from './components/newKanban/NewKanban';
import Library from './page/library/library';
import LogOut from './components/logOut/logOut';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <FileProvider>
          <UserProvider>
            <Sidebar />
            <div className='container'>
              <Routes>
                <Route
                  path='*'
                  element={
                    <>
                      <Navbar />
                      <Home children={
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
                      } />
                    </>
                  }
                />
                <Route
                  path='/login'
                  element={
                    <>
                      <Navbar />
                      <Home children={<LoginModal />} />
                    </>
                  }
                />
                <Route
                  path='/register'
                  element={
                    <>
                      <Navbar />
                      <Home children={<RegisterModal />} />
                    </>
                  }
                />
                <Route path='/kanban' element={
                  <>
                    <Navbar />
                    nie znaleziono wybranego Kanbanu
                  </>
                } />
                <Route path='/kanban/:kanbanId' element={
                  <>
                    <Navbar />
                    <Kanban />
                  </>
                } />
                <Route 
                  path='/kanban/:kanbanId/edit/:taskId' 
                  element={
                    <>
                      <Navbar />
                      <Kanban /> 
                      <EditTask />
                    </>
                  } />
                <Route path='/kanban/:kanbanId/new-task' element={
                  <>
                    <Navbar />
                    <Kanban />
                    <AddTask />
                  </>
                } />
                <Route path='/kanban/:kanbanId/new-section' element={
                  <>
                    <Navbar />
                    <Kanban />
                    <NewSection />
                  </>
                } />
                <Route path='/files' element={
                  <>
                    <Navbar />
                    <Library />
                  </>
                } />
                <Route path='/files/new' element={
                  <>
                    <Navbar />
                    <Library />
                    <NewKanban />
                  </>
                } />
                <Route path='/log-out' element={
                  <>
                  <Navbar />
                  <Home children={
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
                  } />
                  <LogOut />
                </>
                } />
              </Routes>
            </div>
          </UserProvider>
        </FileProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;