import { baseUrl } from './baseUrl';

export const postANote = async (noteData, recipeId) => {
    try {
        const response = await fetch(`${baseUrl}/api/recipes/${recipeId}/notes/`, {
          method: 'POST',
          body: noteData
        })
  
        if(response.ok) {
          const newNote = await response.json();
          return newNote; 
        }
  
        } catch( error) {
        throw new Error('Failed to create a new Note');
      }
}

export const deleteANote = async (recipeId, noteId) => {
    const response = await fetch(`${baseUrl}/api/recipes/${recipeId}/notes/${noteId}/`, {
        method: 'DELETE'
      });

    if(response.ok) {
        return true;
    } else {
        throw new Error('Failed deleting a Note');
    }
}