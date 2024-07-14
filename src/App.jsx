import { useState } from 'react'
// import route, routes, and navigate component
import { Route, Routes, Navigate } from 'react-router-dom';
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
        <Route path="/all" element={<AllRecipesPage />} />
        {/* latest recipe */}
        <Route path={`/recipe/:id`} element={<SpecificRecipePage />} />
        {/* favorite recipes */}
        <Route path="/favorites" element={<FavoriteRecipesPage />} />
      </Routes>

    {/* footer */}

      <Footer />
    </>
  )
}

export default App
