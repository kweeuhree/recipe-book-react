// import context provider
import { useRecipeContext } from './context/RecipeContext';
// import route, routes, and navigate component
import { Route, Routes, Navigate } from 'react-router-dom';
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

  const { allRecipes, favoriteRecipes } = useRecipeContext();

  return (
    <>
    {/* navigation bar */}
      <NavBar />

    {/* main section */}
     <main>

      {/* routes */}
        <Routes>
          {/* navigate to home */}
          <Route path="/" element={<HomePage />} />
    
          {/* all recipes */}
          <Route path="/recipes/" element={<RecipesPage recipes={allRecipes} />} />

          {/* specific recipe */}
          <Route path={`/recipes/:id/`} element={<SpecificRecipePage />} />

          {/* specific recipe */}
          <Route path={`/notes/:id/`} element={<NotesPage />} />

          {/* favorite recipes */}
          <Route path="/favorites/" element={<RecipesPage recipes={favoriteRecipes} />} />

          {/* add new recipe */}
          <Route path="/add/" element={<AddNewRecipePage />} />

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
