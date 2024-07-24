import React, { useState, useEffect } from 'react'
// import params and navigate objects from react router dom
import { useParams, useNavigate } from 'react-router-dom';
// import fetching logic
import { postANote, deleteANote } from '../../utils/fetchNotes.js';
// import hooks
import useMessage from '../../hooks/useMessage.jsx';
// import context
import { useRecipeContext } from '../../context/RecipeContext.jsx';
// import components
import CreateNoteForm from '../../components/Form/CreateNoteForm.jsx';
import Note from '../../components/Note/Note.jsx';
// import styles
import './NotesStyles.css'

const NotesPage = () => {
  // intialize state that will store current notes
  const [ currentNotes, setCurrentNotes ] = useState([]);
  //  intialize state to trigger appearance of a form
  const [ newNote, setNewNote ] = useState(false);
  // use message hook
  const [ message, updateMessage ] = useMessage();
  // use context
  const { allRecipes, updateAllRecipes } = useRecipeContext();

  //  get recipe id from params
  const { id } = useParams();
  // find recipe in recipes array
  const recipe = allRecipes.find((r) => (r.id === id));

  const navigate = useNavigate();
// update current notes each time a recipe changes
  useEffect(() => {
    setCurrentNotes(recipe?.notes);
  }, [recipe?.notes]);

  // trigger form appearance
  const handleCreateNote = () => {
    setNewNote(prev => !prev)
  }

  const updateNotesArray = (action, note) => {
    let updatedNotes;

   try {
    if(action === 'add') {
      updatedNotes = [...currentNotes, note];
    } else {
      updatedNotes = currentNotes.filter((n) => n.id !== note.id)
    }

    setCurrentNotes(updatedNotes);
    updateAllRecipes({ ...recipe, notes: updatedNotes });
    
   } catch(error) {
    throw new Error(error);
   }
  }

  // handle adding a new note
  const postNote = async (data) => {
    try {
      // send a database request to post a new note
      const addedNote = await postANote(data, recipe.id);
      updateNotesArray('add', addedNote);

      } catch( error) {

      updateMessage('This Note is too long!');
      throw new Error('Failed to create a new Note');
    } finally {
      // after a timeout, reset status message regardless of outcome
      setTimeout(() => {
        updateMessage('');
      }, 3000);
    }
  }

  // go back in navigator object
  const handleGoBack = () => {
    navigate(-1);
  }

  // handle deleting a specific note
  const handleDeleteNote = async (note) => {
    // send a database request to delete a specific note of a recipe
    const response = await deleteANote(recipe.id, note.id);
    //  if response is true
    if(response) {
      // filter notes array by note id
      updateNotesArray('filter', note);
      // updateAllRecipes(recipe);
    } else {
      throw new Error('Failed deleting a Note');
    }
      
  }

  return (
    <>
    {/* navigate back */}
      <button onClick={handleGoBack}>Back to recipe</button>
      {/* display notes if exist */}
      {currentNotes?.length > 0 ? (
          currentNotes.map((note) => (
            <Note 
              key={note?.id} 
              note={note} 
              onClick={()=> handleDeleteNote(note)} 
            />
          ))
        ) : (
          // display a message if there are no notes to display
           <p>No notes yet</p>
        )}

      {/* conditionally trigger appearance of a form */}
      <button onClick={handleCreateNote}>
        { newNote ? 'Cancel' : 'Create Note' }
      </button>
      <span className='alert-message'>{message}</span>
      
        {/* if triggered, show a form */}
      {newNote && <CreateNoteForm post={postNote}/>}
    </>
  )
}

export default NotesPage;  