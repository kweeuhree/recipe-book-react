import React, { useState } from 'react'

const CreateNoteForm = ({ post }) => {
    const [ CreateNoteFormData, setCreateNoteFormData ] = useState({
        body: ''
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        const noteData = new FormData(event.target);
        post(noteData);
        setCreateNoteFormData({body: ''});
    }
    
    const handleChange = (event) => {
        // destructure event object
        const { target: {name, value} } = event;

        setCreateNoteFormData((prevCreateNoteFormData) => ({
            ...prevCreateNoteFormData,
            [name]: value
        }))
    }
  
    return (
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