import React from 'react'
import Recipe from '../../components/Recipe/Recipe';

const SpecificRecipePage = ({ handleFavorites, favoriteRecipes, handleCurrentRecipe, currentRecipe }) => {  

  // console.log(currentRecipe, 'inside SpecificRecipePage')
  return (
    <div>
      <Recipe 
          key={currentRecipe?.id} 
          recipe={currentRecipe}
          type="full"
          favoriteRecipes={favoriteRecipes}
          handleFavorites={handleFavorites}
          handleCurrentRecipe={handleCurrentRecipe}      
      />
    </div>
  )
}

export default SpecificRecipePage;