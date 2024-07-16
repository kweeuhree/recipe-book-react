import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';
import './RecipesPageStyle.css';

const RecipesPage = ({ recipes, updateAllRecipes, handleLatestRecipe, handleFilterAllRecipes, handleFavorites, favoriteRecipes, handleCurrentRecipe }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // console.log(recipes, 'inside recipespage')

  const handleClick = () => {
    return pathname === '/recipes/' ? navigate('/favorites/') : navigate(`/recipes/`); 
  }

  return (
    <>

      {/* recipes */}
      <div>
        { recipes?.length > 0 ? (
          recipes.map((recipe) => (
            <Recipe 
              key={recipe?.id} 
              type='preview'
              recipe={recipe}
              handleLatestRecipe={handleLatestRecipe}
              updateAllRecipes={updateAllRecipes}
              handleFilterAllRecipes={handleFilterAllRecipes}
              favoriteRecipes={favoriteRecipes}
              handleFavorites={handleFavorites}
              handleCurrentRecipe={handleCurrentRecipe} 
              onClick={()=> handleCurrentRecipe(recipe)}
            />
          ))
        ) : (
          <p>No recipes yet</p>
        )}
      </div>

       {/* bottom section */}
      <div className="bottom-section">
        <h2>recipe book</h2>

        <button 
          onClick={handleClick}>
            {pathname === '/recipes/' ? 'Favorite Recipes' : 'All Recipes'}
        </button>

      </div>
    </>
  )
}

export default RecipesPage;