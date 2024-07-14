import React from 'react'
// import components
import CreateForm from '../../components/Form/CreateForm';

const AddNewRecipePage = () => {
  
  return (
    <div className='create-from-container'>
      {/* form */}
      <CreateForm type='recipe' />

    </div>
  )
}

export default AddNewRecipePage;