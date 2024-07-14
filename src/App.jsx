import { useState, useEffect } from 'react'
// import route, routes, and navigate component
import { Route, Routes, Navigate } from 'react-router-dom';
// import fetching logic
import fetchRecipes from './utils/fetchRecipes';
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
  const [ latestRecipe, setLatestRecipe ] = useState(null);

  useEffect(()=> {
      const fetchAllRecipes = async() => {
        const recipesData = await fetchRecipes();
        setAllRecipes((prev) => ([...prev, recipesData]));
        setLatestRecipe(recipesData[0])
      }

      fetchAllRecipes();
  }, [])

  return (
    <>
    {/* navigation bar */}
      <NavBar />

    {/* routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> 
        {/* home page */}
        <Route path="/home" element={<HomePage />} />
        {/* all recipes */}
        <Route path="/all" element={<AllRecipesPage recipes={<allRecipes />} />} />
        {/* latest recipe */}
        <Route path={`/recipe`} element={<SpecificRecipePage recipe={latestRecipe} />} />
        {/* favorite recipes */}
        <Route path="/favorites" element={<FavoriteRecipesPage recipes={favoriteRecipes} />} />
      </Routes>

    {/* footer */}

      <Footer />
    </>
  )
}

export default App
