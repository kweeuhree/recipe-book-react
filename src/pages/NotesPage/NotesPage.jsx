import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CreateNoteForm from '../../components/Form/CreateNoteForm.jsx';

const NotesPage = ({ recipes }) => {

  const [ currentNotes, setCurrentNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState(false);
  const { recipeId } = useParams();
  const recipe = recipes.find((r) => (r.id === parseInt(recipeId, 10)));

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentNotes(recipe?.notes);
  }, [recipe])


  const handleCreateNote = () => {
    setNewNote(prev => !prev)
  }

  const updateCurrentNotes = (newNote) => {
    setCurrentNotes((prevCurrentNotes) => ([
      ...prevCurrentNotes,
      newNote
    ]))
  }

  const postNote = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${recipeId}/notes/`, {
        method: 'POST',
        body: data
      })

      if(response.ok) {
        const newNote = await response.json();
        updateCurrentNotes(newNote);
      }

      } catch( error) {
      throw new Error('Failed to create a new Note');
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <>
      <button onClick={handleGoBack}>Back to recipe</button>
      {currentNotes?.length > 0 ? (
          currentNotes.map((note) => (
            <div key={note.id}>{note.body}</div>
          ))
        ) : (
           <p>No notes yet</p>
        )}

      <button onClick={handleCreateNote}>{newNote ? 'Cancel' : 'Create Note'}</button>

      {newNote && <CreateNoteForm post={postNote}/>}
    </>
  )
}

export default NotesPage;