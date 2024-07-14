import React from 'react'
import Navigate from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';
import AllRecipesPage from '../AllRecipesPage/AllRecipesPage';

const FavoriteRecipesPage = ({ recipes, handleFavorites, handleCurrentRecipe }) => {

  const recipesJSX = recipes.map((recipe) => (
        <Recipe 
          key={recipe.id} 
          handleFavorites={handleFavorites} 
          handleCurrentRecipe={handleCurrentRecipe}
        />
  ));

  return (
    <>
    {/* top section */}
      <div className="top-section">
        <h2>recipe book</h2>
        <p onClick={ <Navigate to={`/all`} />}>All Recipes</p>
      </div>

      {/* recipes */}
      <div>{recipesJSX}</div>
    </>
  )
}

export default FavoriteRecipesPage;