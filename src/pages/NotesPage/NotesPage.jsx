import React from 'react'
import { useParams } from 'react-router-dom';

const NotesPage = ({ recipes }) => {

  console.log(recipes)
  const { recipeId } = useParams();
  console.log(recipeId)
  const recipe = recipes.filter((r) => r.id === recipeId);

  console.log(recipe, 'recipe in notesPage')
  return (
    recipe.notes?.length > 0 ? (
      recipe.notes.map((note) => (
        <div key={note.id}>{note.body}</div>
      ))
    ) : (
      <>
        <p>No notes yet</p>
        <button>Create Note</button>
      </>
    )
  )
}

export default NotesPage;