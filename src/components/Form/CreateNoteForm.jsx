import React, { useState } from 'react'

const CreateNoteForm = ({ post }) => {
     // intialize form data state
    const [ CreateNoteFormData, setCreateNoteFormData ] = useState({
        body: ''
    })
    // handle form submit
    const handleSubmit = (event) => {
        // prevent default behavior
        event.preventDefault();
        // set form data object with note data
        const noteData = new FormData(event.target);
         // handle posting a new note
        post(noteData);
        // reset form state
        setCreateNoteFormData({body: ''});
    }
    
    // handle form change
    const handleChange = (event) => {
        // destructure event object
        const { target: {name, value} } = event;
        // update state
        setCreateNoteFormData((prevCreateNoteFormData) => ({
            ...prevCreateNoteFormData,
            [name]: value
        }))
    }
  
    return (
        // display form
    <form id="create-note" onSubmit={handleSubmit}>

     
        <input 
            type="text" 
            name="body"
            id="body" 
            value={CreateNoteFormData.body} 
            onChange={handleChange} 
            required 
            placeholder="Enter note details"
        /><br />

            <input type="submit" />
        
    </form>
  )
}

export default CreateNoteForm;