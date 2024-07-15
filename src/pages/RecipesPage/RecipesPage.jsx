import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';

const RecipesPage = ({ recipes, handleFavorites, handleCurrentRecipe }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // console.log(recipes, 'inside recipespage')

  const handleClick = () => {
    return pathname === '/all/' ? navigate('/favorites/') : navigate(`/all/`); 
  }

  return (
    <>
    {/* top section */}
      <div className="top-section">
        <h2>recipe book</h2>

        <p 
          onClick={handleClick}>
            {pathname === '/all/' ? 'Favorite Recipes' : 'All Recipes'}
        </p>

      </div>

      {/* recipes */}
      <div>
        { recipes?.length > 0 ? (
          recipes.map((recipe) => (
            <Recipe 
              key={recipe?.id} 
              type='preview'
              recipe={recipe}
              handleFavorites={handleFavorites}
              handleCurrentRecipe={handleCurrentRecipe} 
              onClick={()=> handleCurrentRecipe(recipe)}
            />
          ))
        ) : (
          <p>No recipes yet</p>
        )}
      </div>
    </>
  )
}

export default RecipesPage;