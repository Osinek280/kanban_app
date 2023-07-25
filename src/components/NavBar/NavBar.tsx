import './NavBar.css';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useFileContext } from '../../context/FileContext';

function Navbar() {
  const { kanbanId } = useParams();
  const location = useLocation();
  const { searchValue, setSearchValue } = useFileContext()

  return (
    <header className="main-header">
      <span className="text">Hello</span>
      {location.pathname.startsWith('/files') ? (
        <>
          <span className="search">
            <input
              className="search-input" 
              placeholder="Search"
              defaultValue={searchValue}
              onChange={(e) => {setSearchValue(e.currentTarget.value)}}
            />
          </span>
          <Link to={`/files/new`} className="new-kanban-btn">
            Add New Kanban
          </Link>
        </> 
      ) : null}
      {location.pathname.startsWith('/kanban') ? (
        <>
          <Link to={`/kanban/${kanbanId}/new-task`} className="new-task-btn">
            Add New Task
          </Link>
          <Link to={`/kanban/${kanbanId}/new-section`} className="new-section-btn">
            Add New Section
          </Link>
        </>
      ) : null}
    </header>
  );
}

export default Navbar;
