import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { useFileContext } from '../../context/FileContext';

function NewSection() {
  const { kanbanId } = useParams();
  const navigate = useNavigate();

  const { user } = useUserContext()
  const { fetchFiles } = useFileContext()

  const addNewSection = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { section } = event.currentTarget.elements as any;
    fetch(`${process.env.API_URL}/kanban/${kanbanId}/new-section`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ section: section.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(user) {
          fetchFiles(user.id)
        }
        navigate(`/kanban/${kanbanId}`)
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={addNewSection}>
        <div className="form-group">
          <label className="form-label" style={{ marginBottom: "3px" }}>
            Section Name
          </label>
          <input
            id="section-name-input"
            type="text"
            className={'form-input'}
            placeholder="e.g Take coffee break"
            name="section"
          />
          <button
            className="form-submit-button"
          >
            Add new Section
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewSection;
