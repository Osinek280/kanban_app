import './NavBar.css';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  return (
    <header className="main-header">
      <span className="text">Hello</span>
      {location.pathname === '/files' ? (
        <>
          <span className="search">
            <input
              className="search-input" 
              placeholder="Search"
            />
          </span>
          <button className="new-kanban-btn">
            Add New Kanban
          </button>
        </> 
      ) : null}
      {location.pathname.startsWith('/kanban') ? (
        <>
          <button className="new-task-btn">
            Add New Task
          </button>
          <button className="new-section-btn">
            Add New Section
          </button>
        </>
      ) : null}
    </header>
  );
}

export default Navbar;
