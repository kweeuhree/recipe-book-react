import { useState, useEffect } from 'react'
// import route, routes, and navigate component
import { Route, Routes, Navigate } from 'react-router-dom';
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

import './App.css'

function App() {
  const [ allRecipes, setAllRecipes ] = useState([]);
  const [ favoriteRecipes, setFavoriteRecipes ] = useState([]);
  const [ currentRecipe, setCurrentRecipe ] = useState(null);
  const [ latestRecipe, setLatestRecipe ] = useState(null);

  useEffect(()=> {
      const fetchAllRecipes = async() => {
        const recipesData = await fetchRecipes();
        setAllRecipes((prev) => ([...prev, recipesData]));
        setLatestRecipe(recipesData[0]);
        updateFavoriteRecipes(recipesData);
      }

      fetchAllRecipes();
  }, [])

  const updateFavoriteRecipes = (recipesData) => {
    const likedRecipes = recipesData.filter((recipe) => (
      recipe.isLiked !== false
    ))

    setFavoriteRecipes(likedRecipes);
  }
  

  // handle updating current recipe
  const handleCurrentRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    return <Navigate to={`/recipes/${recipe.id}/`} />;
  }

  // handle adding or removing from favorite recipes
  const handleFavorites = async (event) => {
    event.stopPropagation();

    const found = favoriteRecipes.find(
      favRecipe => favRecipe.id === currentRecipe.id
    );

    if(found) {
      setFavoriteRecipes((prev) => 
        (prev.filter((favRecipe) => favRecipe.id !== currentRecipe.id)));
      await unlikeFavoriteRecipe(currentRecipe.id);
    } else {
      setFavoriteRecipes((prev) => ([currentRecipe, ...prev]));
      await likeARecipe(currentRecipe.id);
    }

  }

  const handleLatestRecipe = (newRecipe) => {
    setLatestRecipe(newRecipe);
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
        <Route path="/all/" element={
          <RecipesPage 
            recipes={allRecipes} 
            handleFavorites={handleFavorites} 
            currentRecipe={currentRecipe}/>
        } />

        {/* specific recipe */}
        <Route path={`/recipe/:id/`} element={
          <SpecificRecipePage 
            handleFavorites={handleFavorites} 
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
