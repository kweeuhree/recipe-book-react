import React from 'react';
// import context
import { useRecipeContext } from '../../context/RecipeContext';
// import components
import Recipe from '../../components/Recipe/Recipe';

const HomePage = () => {
  // use recipe context
  const { latestRecipe, handleCurrentRecipe, favoriteRecipes } = useRecipeContext();

// console.log(latestRecipe, 'latest recipe in homepage')
  return (
    <main>
      {/* latest recipe */}
      <div className='latestRecipe' onClick={() => handleCurrentRecipe(latestRecipe)}>
        <p>Latest Recipe:</p>
           { latestRecipe && 
            <Recipe 
              key={'latestRecipe' + latestRecipe.id} 
              recipe={latestRecipe}
              type='preview'
              onClick={()=> handleCurrentRecipe(latestRecipe)}
             /> }
      </div>

      {/* favorite recipes */}
      <div className='favorite-carousel'>
      <p>Favorite Recipes:</p>
        { favoriteRecipes?.length > 0  ?
          favoriteRecipes.map((recipe) => (
            <Recipe 
              key={recipe?.id} 
              type='preview'
              recipe={recipe}
              onClick={()=> handleCurrentRecipe(recipe)}
               />
          )) :
          <p>No favorite recipes yet!</p>
        }
      </div>
    </main>
  )
}

export default HomePage;