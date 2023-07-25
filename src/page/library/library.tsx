import { useFileContext } from "../../context/FileContext"
import fileIcon from '../../assets/image/file-icon.svg'
import './library.css'
import { Link } from "react-router-dom";

function Library () {
  const {files, searchValue} = useFileContext();
  
  const filteredFiles = files.filter((file) => 
    file.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return(
    <div className="library-container">
      {filteredFiles.map((file, fileIndex) => (
            <Link to={`/kanban/${file.id}`} key={fileIndex} className="file-con">
              <div
                className="file" 
              >
                <span className="img-box">
                  <img src={fileIcon} alt="file-img" />
                </span>
                <span>{file.name}</span>
              </div>
            </Link>
          ))}
    </div>
  )
}

export default Library