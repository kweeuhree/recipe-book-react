import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe';

const RecipesPage = ({ recipes, handleFavorites, handleCurrentRecipe }) => {

  const location = useLocation();
  const pathname = location.pathname;

  const recipesJSX = recipes.map((recipe) => (
        <Recipe 
          key={recipe.id} 
          handleFavorites={handleFavorites} 
          handleCurrentRecipe={handleCurrentRecipe}
        />
  ));

  const handleClick = () => {
    return (
      <Navigate to={pathname === '/all/' ? '/favorites/' : `/all/`} />
    );
  }

  return (
    <>
    {/* top section */}
      <div className="top-section">
        <h2>recipe book</h2>

        <p 
          onClick={handleClick}>
            {pathname === '/all/' ? 'All Recipes' : 'Favorite Recipes'}
        </p>

      </div>

      {/* recipes */}
      <div>{recipesJSX}</div>
    </>
  )
}

export default RecipesPage;