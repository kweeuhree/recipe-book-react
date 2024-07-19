import React from 'react'
import Recipe from '../../components/Recipe/Recipe';

const SpecificRecipePage = ({ handleFilterAllRecipes, allRecipes, updateAllRecipes, handleLatestRecipe, handleFavorites, favoriteRecipes, handleCurrentRecipe, currentRecipe }) => {  

  return (
    <div>
      <Recipe 
          key={currentRecipe?.id} 
          recipe={currentRecipe}
          type="full"
          allRecipes={allRecipes}
          updateAllRecipes={updateAllRecipes}
          handleLatestRecipe={handleLatestRecipe}
          handleFilterAllRecipes={handleFilterAllRecipes}
          favoriteRecipes={favoriteRecipes}
          handleFavorites={handleFavorites}
          handleCurrentRecipe={handleCurrentRecipe}      
      />
    </div>
  )
}

export default SpecificRecipePage;