import React from 'react'
import { useParams } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';

const SpecificRecipePage = ({ handleFavorites, handleCurrentRecipe, currentRecipe }) => {  

  // console.log(currentRecipe, 'inside SpecificRecipePage')
  return (
    <div>
      <Recipe 
          key={currentRecipe?.id} 
          recipe={currentRecipe}
          type="full"
          handleFavorites={handleFavorites}
          handleCurrentRecipe={handleCurrentRecipe}      
      />
    </div>
  )
}

export default SpecificRecipePage;