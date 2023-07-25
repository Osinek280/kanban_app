import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useFileContext } from "../../context/FileContext";

function NewKanban () {
  const { user } = useUserContext();
  const {fetchFiles} = useFileContext();
  const navigate = useNavigate();
  const addNewKanban = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { kanban } = event.currentTarget.elements as any;

    if(user) {
      fetch(`${process.env.API_URL}/kanban/new/${user.id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kanban: kanban.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          fetchFiles(user.id)
          navigate('/files')
        })
        .catch(error => console.error(error));
    }
  }
  return(
    <div className="form-container">
      <form className="form" onSubmit={addNewKanban}>
        <div className="form-group">
          <label className="form-label" style={{ marginBottom: "3px" }}>
            Kanban Name
          </label>
          <input
            id="section-name-input"
            type="text"
            className={'form-input'}
            placeholder="e.g Take coffee break"
            name="kanban"
          />
          <button
            className="form-submit-button"
          >
            Add new Kanban
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewKanban;