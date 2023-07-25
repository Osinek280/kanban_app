import './SideBar.css';
import { BsHouseDoor, BsHouseFill } from 'react-icons/bs';
import { BiBook } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBook } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useFileContext } from '../../context/FileContext';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdLogin } from 'react-icons/md'

const Sidebar = () => {
  const location = useLocation();

  const { files } = useFileContext();
  
  return (
    <nav className="navbar">
      <Link to="/home" className="icon">
        {location.pathname === '/home' ? <BsHouseFill /> : <BsHouseDoor />}
        <span className="tool-tip-text" id="tool-tip-text-home">Home</span>
      </Link>
      <Link to="/files" className="icon">
        <AiOutlineSearch />
        <span className="tool-tip-text" id="tool-tip-text-search">Search</span>
      </Link>
      <Link to="/files" className="icon">
        {location.pathname === '/files' ? <FaBook /> : <BiBook />}
        <span className="tool-tip-text" id="tool-tip-text-library">Library</span>
      </Link>
      {files && files.length !== 0 && <span className="vertical-line"></span>}
      {files && files.map((file, index) => (
        <Link key={index} to={`/kanban/${file.id}`} className="icon">
          <IoDocumentTextOutline />
          <p>{file.name}</p>
        </Link>
      ))}
      <Link to={'/log-out'} className='icon log-out'>
        <MdLogin />
      </Link>
    </nav>
  );
};

export default Sidebar;
