// import recipe context
import { useRecipeContext } from '../../context/RecipeContext';
// import components
import Recipe from '../../components/Recipe/Recipe';

const SpecificRecipePage = () => {  
// use context
  const { currentRecipe } = useRecipeContext();

  return (
    <div>
      {/* display a recipe */}
      <Recipe 
          key={currentRecipe?.id} 
          recipe={currentRecipe}
          type="full"

      />
    </div>
  )
}

export default SpecificRecipePage;