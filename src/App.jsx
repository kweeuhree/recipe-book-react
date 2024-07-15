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
import HomePage from './pages/HomePage/HomePage';
import SpecificRecipePage from './pages/SpecificRecipePage/SpecificRecipePage';
import AddNewRecipePage from './pages/AddNewRecipePage/AddNewRecipePage';
//import styles
import './App.css'

function App() {
  const [ allRecipes, setAllRecipes ] = useState([]);
  const [ favoriteRecipes, setFavoriteRecipes ] = useState([]);
  const [ currentRecipe, setCurrentRecipe ] = useState(null);
  const [ latestRecipe, setLatestRecipe ] = useState(null);

  const navigate = useNavigate();

  // fetch all recipes
  useEffect(()=> {
      const fetchAllRecipes = async () => {
        const recipesData = await fetchRecipes();
        
        setAllRecipes(recipesData);
        handleLatestRecipe(recipesData);
        updateFavoriteRecipes(recipesData);
      }
      
      fetchAllRecipes();
  }, [])

  //update each time there is a new recipe added
  useEffect(() => {
    updateAllRecipes();
  }, [latestRecipe]);

 // update all recipes
  const updateAllRecipes = (recipe) => {
    recipe &&
    setAllRecipes((prevAllRecipes) => ([recipe, ...prevAllRecipes]));
  }

  // handle updating current recipe
  const handleCurrentRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    navigate(`/recipes/${recipe.id}`);
  }

  // handle liked recipes
  const updateFavoriteRecipes = (recipesData) => {
    const likedRecipes = recipesData?.filter((recipe) => (
      recipe.isLiked === true
    ))
    setFavoriteRecipes(likedRecipes);
    console.log(likedRecipes);
  }


  // handle adding or removing from favorite recipes
  const handleFavorites = async (recipe) => {

    const found = favoriteRecipes.find(
      favRecipe => favRecipe.id === recipe.id
    );


    if(found) {
      setFavoriteRecipes((prev) => 
        (prev.filter((favRecipe) => favRecipe.id !== recipe.id)));
      await unlikeFavoriteRecipe(recipe.id);
    } else {
      setFavoriteRecipes((prev) => ([recipe, ...prev]));
      await likeARecipe(recipe.id);
    }

    updateFavoriteRecipes();
  }

  // update latest recipe
  const handleLatestRecipe = (recipeObject) => {
    setLatestRecipe(recipeObject[0]);
  }



  return (
    <>
    {/* navigation bar */}
      <NavBar />

    {/* routes */}
      <Routes>
        {/* navigate to home */}
        <Route path="/" element={<Navigate to="/home/" />} /> 

        {/* home page */}
        <Route path="/home/" element={
          <HomePage 
            latestRecipe={latestRecipe} 
            favoriteRecipes={favoriteRecipes} 
            handleFavorites={handleFavorites} 
            handleCurrentRecipe={handleCurrentRecipe}
            currentRecipe={currentRecipe}/>
        } />

        {/* all recipes */}
        <Route path="/recipes/" element={
          <RecipesPage 
            recipes={allRecipes} 
            handleFavorites={handleFavorites} 
            handleCurrentRecipe={handleCurrentRecipe}
            currentRecipe={currentRecipe}/>
        } />

        {/* specific recipe */}
        <Route path={`/recipes/:id/`} element={
          <SpecificRecipePage 
            handleFavorites={handleFavorites} 
            handleCurrentRecipe={handleCurrentRecipe}
            currentRecipe={currentRecipe} />
        } />

        {/* favorite recipes */}
        <Route path="/favorites/" element={
          <RecipesPage 
            recipes={favoriteRecipes} 
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

      </Routes>

      {/* footer */}
      <Footer />

    </>
  )
}

export default App
