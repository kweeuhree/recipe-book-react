import { useState, useEffect } from 'react'
// import route, routes, and navigate component
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import fetching logic
import { fetchRecipes, unlikeFavoriteRecipe, likeARecipe } from './utils/fetchRecipes';
// import components
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
// import pages
import RecipesPage from './pages/RecipesPage/RecipesPage';
import NotesPage from './pages/NotesPage/NotesPage';
import HomePage from './pages/HomePage/HomePage';
import SpecificRecipePage from './pages/SpecificRecipePage/SpecificRecipePage';
import AddNewRecipePage from './pages/AddNewRecipePage/AddNewRecipePage';
//import styles
import './App.css'

function App() {
  // initialize state to store an array of all recipes
  const [ allRecipes, setAllRecipes ] = useState([]);
  // initialize state to store an array of favorite recipes
  const [ favoriteRecipes, setFavoriteRecipes ] = useState([]);
  // intiialize state to store current recipe
  const [ currentRecipe, setCurrentRecipe ] = useState(null);
  // initialize state to store last added recipe
  const [ latestRecipe, setLatestRecipe ] = useState(null);

  const navigate = useNavigate();

  // fetch all recipes
  useEffect(()=> {
      const fetchAllRecipes = async () => {
        const recipesData = await fetchRecipes();
        // latest recipe is the first one in the array
        const latestRecipe = recipesData[0];
        //update state based on received data
        setAllRecipes(recipesData);
        handleLatestRecipe(latestRecipe);
        updateFavoriteRecipes(recipesData);
      }
      
      fetchAllRecipes();
  }, []);

 // update all recipes
  const updateAllRecipes = (recipe) => {
    
    // if recipe id matches an already existing one
    const found = allRecipes.find(r => r.id === recipe.id);
    if(found) {
      setAllRecipes((prevAllRecipes) => {
        return prevAllRecipes.map((r) => {
          // update recipe with the matching id
          if (r.id === recipe.id) {
            return {
              ...r,
              title: recipe.title || r.title,
              description: recipe.description || r.description,
              ingredients: recipe.ingredients || r.ingredients,
              instructions: recipe.instructions || r.instructions,
              servings: recipe.servings || r.servings
            };
          }
          return r; // return recipes that weren't updated
        });
      });
    } else {
      // if id didnt match, add recipe to array
      setAllRecipes((prevAllRecipes) => ([recipe, ...prevAllRecipes]));
    }
  }

  // handle updating current recipe
  const handleCurrentRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    console.log(recipe, 'inside handler')
    // navigate to page
    navigate(`/recipes/${recipe.id}/`);
  }

  // handle initial state of favorite recipes
  const updateFavoriteRecipes = (recipesData) => {
    // get array with liked recipes, filter by isLiked
    const likedRecipes = recipesData?.filter((recipe) => (
      recipe.isLiked === true
    ))
    // set state with new array
    setFavoriteRecipes(likedRecipes);
  }


  // handle adding or removing from favorite recipes
  const handleFavorites = async (recipe) => {
    // check if recipe is in favorite recipes
    const found = favoriteRecipes.find(
      favRecipe => favRecipe.id === recipe.id
    );

    // if recipe is liked, remove from favorites
    if(found) {
      setFavoriteRecipes((prev) => 
        (prev.filter((favRecipe) => favRecipe.id !== recipe.id)));
      // send database request
      await unlikeFavoriteRecipe(recipe.id);
      // if recipe isnt liked 
    } else {
      // add to favorite recipes
      setFavoriteRecipes((prev) => ([recipe, ...prev]));
      // send database request
      await likeARecipe(recipe.id);
    }

  }

  // update latest recipe
  const handleLatestRecipe = (recipe) => {
    setLatestRecipe(recipe);
  }

  // filter all recipes based on recipeId
  const handleFilterAllRecipes = (recipeId) => {

    setAllRecipes((prevAllRecipes) => (
      // filter by id
      prevAllRecipes.filter((r) => (
        r.id !== recipeId
      ))
    ))

    latestRecipe.id === recipeId && setLatestRecipe(allRecipes[1]);
  }



  return (
    <>
    {/* navigation bar */}
      <NavBar />
<main>
    {/* routes */}
      <Routes>
        {/* navigate to home */}
        <Route path="/" element={
          <HomePage 
            allRecipes={allRecipes}
            latestRecipe={latestRecipe} 
            handleLatestRecipe={handleLatestRecipe}
            updateAllRecipes={updateAllRecipes}
            handleFilterAllRecipes={handleFilterAllRecipes}
            favoriteRecipes={favoriteRecipes} 
            handleFavorites={handleFavorites} 
            handleCurrentRecipe={handleCurrentRecipe}
            currentRecipe={currentRecipe}/>
          } />
   
        {/* all recipes */}
        <Route path="/recipes/" element={
          <RecipesPage 
            allRecipes={allRecipes}
            handleLatestRecipe={handleLatestRecipe}
            recipes={allRecipes} 
            updateAllRecipes={updateAllRecipes}
            handleFilterAllRecipes={handleFilterAllRecipes}
            favoriteRecipes={favoriteRecipes}
            handleFavorites={handleFavorites} 
            handleCurrentRecipe={handleCurrentRecipe}
            currentRecipe={currentRecipe}/>
        } />

        {/* specific recipe */}
        <Route path={`/recipes/:id/`} element={
          <SpecificRecipePage 
            allRecipes={allRecipes}
            handleLatestRecipe={handleLatestRecipe}
            updateAllRecipes={updateAllRecipes}
            handleFilterAllRecipes={handleFilterAllRecipes}
            favoriteRecipes={favoriteRecipes}
            handleFavorites={handleFavorites} 
            handleCurrentRecipe={handleCurrentRecipe}
            currentRecipe={currentRecipe} />
        } />

        {/* specific recipe */}
        <Route path={`/notes/:id/`} element={
          <NotesPage 
            recipes={allRecipes}
             />
        } />

        {/* favorite recipes */}
        <Route path="/favorites/" element={
          <RecipesPage 
            allRecipes={allRecipes}
            handleLatestRecipe={handleLatestRecipe}
            updateAllRecipes={updateAllRecipes}
            handleFilterAllRecipes={handleFilterAllRecipes}
            recipes={favoriteRecipes} 
            favoriteRecipes={favoriteRecipes}
            handleFavorites={handleFavorites} 
            handleCurrentRecipe={handleCurrentRecipe} />
        } />

        {/* add new recipe */}
        <Route path="/add/" element={
          <AddNewRecipePage
            updateAllRecipes={updateAllRecipes}
            handleCurrentRecipe={handleCurrentRecipe}
            handleLatestRecipe={handleLatestRecipe} />
        } />

        {/* catch all route */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      </main>
      
      {/* footer */}
      <Footer />

    </>
  )
}

export default App
