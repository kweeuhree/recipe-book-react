// import recipe context
import { useRecipeContext } from '../../context/RecipeContext';
// import navigate and location objects form react router dom
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import components
import Recipe from '../../components/Recipe/Recipe';
// import styles
import './RecipesPageStyle.css';

const RecipesPage = ({ recipes }) => {

  const { handleCurrentRecipe } = useRecipeContext();
  const navigate = useNavigate();
  const location = useLocation();
  // get pathname from location object
  const pathname = location.pathname;

  // const { id } = useParams();
  // console.log(id, 'id')

  // const recipe = allRecipes?.find((r) => r?.id === id);

  // on click conditionally navigate
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
              recipes={recipes}
              onClick={()=> handleCurrentRecipe(recipe)}
            />
          ))
        ) : (
          // display a message if there are no recipes to display
          <p>No recipes yet</p>
        )}
      </div>

       {/* bottom section */}
      <div className="bottom-section">
        <h2>recipe book</h2>

         {/* on click conditionally navigate */}
        <button onClick={handleClick}>
            {pathname === '/recipes/' ? 'Favorite Recipes' : 'All Recipes'}
        </button>

      </div>
    </>
  )
}

export default RecipesPage;