import { useState, useEffect } from 'react'
// import route, routes, and navigate component
import { Route, Routes, Navigate } from 'react-router-dom';
// import fetching logic
import { fetchRecipes, unlikeFavoriteRecipe, likeARecipe } from './utils/fetchRecipes';
// import components
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
// import pages
import AllRecipesPage from './pages/AllRecipesPage/AllrecipesPage';
import FavoriteRecipesPage from './pages/FavoriteRecipesPage/FavoriteRecipesPage';
import HomePage from './pages/HomePage/HomePage';
import SpecificRecipePage from './pages/SpecificRecipePage/SpecificRecipePage';

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


  return (
    <>
    {/* navigation bar */}
      <NavBar />

    {/* routes */}
      <Routes>
        {/* navigate to home */}
        <Route path="/" element={<Navigate to="/home" />} /> 

        {/* home page */}
        <Route path="/home" element={
          <HomePage 
            latestRecipe={latestRecipe} 
            favoriteRecipes={favoriteRecipes} 
            handleFavorites={handleFavorites} 
            currentRecipe={currentRecipe}/>
        } />

        {/* all recipes */}
        <Route path="/all" element={
          <AllRecipesPage 
            recipes={allRecipes} 
            handleFavorites={handleFavorites} 
            currentRecipe={currentRecipe}/>
        } />

        {/* specific recipe */}
        <Route path={`/recipe/:id`} element={
          <SpecificRecipePage 
            handleFavorites={handleFavorites} 
            currentRecipe={currentRecipe} />
        } />

        {/* favorite recipes */}
        <Route path="/favorites" element={
          <FavoriteRecipesPage 
            recipes={favoriteRecipes} 
            handleFavorites={handleFavorites} 
            currentRecipe={currentRecipe} />
        } />

      </Routes>

      {/* footer */}
      <Footer />

    </>
  )
}

export default App
