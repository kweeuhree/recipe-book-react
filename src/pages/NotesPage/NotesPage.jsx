import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CreateNoteForm from '../../components/Form/CreateNoteForm.jsx';

const NotesPage = ({ recipes }) => {

  const [ newNote, setNewNote ] = useState(false);
  const { recipeId } = useParams();
  console.log(recipeId)
  const recipe = recipes.find((r) => (r.id === parseInt(recipeId, 10)));

  console.log(recipe, 'recipe');

  const handleCreateNote = () => {
    setNewNote(prev => !prev)
  }

  const postNote = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${recipeId}/notes/`, {
        method: 'POST',
        body: data
      })

      if(response.ok) {
        const newNote = await response.json();
      }

      recipe.notes.push(newNote);

    } catch( error) {
      throw new Error('Failed to create a new Note');
    }
  }

  return (
    <>
      {recipe?.notes.length > 0 ? (
          recipe.notes.map((note) => (
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