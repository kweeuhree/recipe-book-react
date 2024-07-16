import React, { useState, useEffect } from 'react'
import { FaRegWindowClose } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import CreateNoteForm from '../../components/Form/CreateNoteForm.jsx';
import './NotesStyles.css'

const NotesPage = ({ recipes }) => {

  const [ currentNotes, setCurrentNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState(false);
  const { recipeId } = useParams();
  const recipe = recipes.find((r) => (r.id === recipeId));
  console.log(recipe);

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
      const response = await fetch(`http://3.141.17.82/api/recipes/${recipeId}/notes/`, {
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

  const handleDeleteNote = async (note) => {
      await fetch(`http://3.141.17.82/api/recipes/${recipeId}/notes/${note.id}/`, {
        method: 'DELETE'
      })

      setCurrentNotes((prevCurrentNotes) => (
        prevCurrentNotes.filter((n) => n.id !== note.id)
      ))
  }

  return (
    <>
      <button onClick={handleGoBack}>Back to recipe</button>
      {currentNotes?.length > 0 ? (
          currentNotes.map((note) => (
            <div key={note.id} className='note'><span>{note.body}</span><span onClick={()=> handleDeleteNote(note)}><FaRegWindowClose /></span></div>
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