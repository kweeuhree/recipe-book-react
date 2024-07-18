import React, { useState, useEffect } from 'react'
// import react icon
import { FaRegWindowClose } from "react-icons/fa";
// import params and navigate objects from react router dom
import { useParams, useNavigate } from 'react-router-dom';
// import fetching logic
import { postANote, deleteANote } from '../../utils/fetchNotes.js';
// import components
import CreateNoteForm from '../../components/Form/CreateNoteForm.jsx';
// import styles
import './NotesStyles.css'

const NotesPage = ({ recipes }) => {
  // intialize state that will store current notes
  const [ currentNotes, setCurrentNotes ] = useState([]);
  //  intialize state to trigger appearance of a form
  const [ newNote, setNewNote ] = useState(false);
  //  get recipe id from params
  const { recipeId } = useParams();
  // find recipe in recipes array
  const recipe = recipes.find((r) => (r.id === recipeId));
  console.log(recipe);

  const navigate = useNavigate();
// update current notes each time a recipe changes
  useEffect(() => {
    setCurrentNotes(recipe?.notes);
  }, [recipe]);

  // trigger form appearance
  const handleCreateNote = () => {
    setNewNote(prev => !prev)
  }

  // update notes array
  const updateCurrentNotes = (newNote) => {
    setCurrentNotes((prevCurrentNotes) => ([
      ...prevCurrentNotes,
      newNote
    ]))
  }

  // handle adding a new note
  const postNote = async (data) => {
    try {
      // send a database request to post a new note
        const newNote = await postANote(data, recipeId);
        // update notes array
        updateCurrentNotes(newNote);

      } catch( error) {
      throw new Error('Failed to create a new Note');
    }
  }

  // go back in navigator object
  const handleGoBack = () => {
    navigate(-1);
  }

  // handle deleting a specific note
  const handleDeleteNote = async (note) => {
    // send a database request to delete a specific note of a recipe
    const response = await deleteANote(recipeId, note.id);
    //  if response is true
    if(response) {
      // filter notes array by note id
      setCurrentNotes((prevCurrentNotes) => (
        prevCurrentNotes.filter((n) => n.id !== note.id)
      ))
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
            <div key={note.id} className='note'><span>{note.body}</span><span onClick={()=> handleDeleteNote(note)}><FaRegWindowClose /></span></div>
          ))
        ) : (
          // display a message if there are no notes to display
           <p>No notes yet</p>
        )}

      {/* conditionally trigger appearance of a form */}
      <button onClick={handleCreateNote}>
        { newNote ? 'Cancel' : 'Create Note' }
      </button>
      
        {/* if triggered, show a form */}
      {newNote && <CreateNoteForm post={postNote}/>}
    </>
  )
}

export default NotesPage;  