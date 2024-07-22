// import { useState, useEffect, useContext } from 'react';
// import context provider
import { RecipeProvider } from './context/RecipeContext';
// import route, routes, and navigate component
import { Route, Routes, Navigate } from 'react-router-dom';
// import fetching logic
// import { fetchRecipes, unlikeFavoriteRecipe, likeARecipe } from './utils/fetchRecipes';
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

  // const navigate = useNavigate();

//   // fetch all recipes
//   useEffect(()=> {
//       const fetchAllRecipes = async () => {
//         const recipesData = await fetchRecipes();
//         // latest recipe is the first one in the array
//         const latestRecipe = recipesData[0];
//         //update state based on received data
//         setAllRecipes(recipesData);
//         handleLatestRecipe(latestRecipe);
//         updateFavoriteRecipes(recipesData);
//       }
      
//       fetchAllRecipes();
//   }, []);

//  // update all recipes
//   const updateAllRecipes = (recipe) => {
    
//     // if recipe id matches an already existing one
//     const found = allRecipes.find(r => r.id === recipe.id);
//     if(found) {
//       setAllRecipes((prevAllRecipes) => {
//         return prevAllRecipes.map((r) => {
//           // update recipe with the matching id
//           if (r.id === recipe.id) {
//             return {
//               ...r,
//               title: recipe.title || r.title,
//               description: recipe.description || r.description,
//               ingredients: recipe.ingredients || r.ingredients,
//               instructions: recipe.instructions || r.instructions,
//               servings: recipe.servings || r.servings
//             };
//           }
//           return r; // return recipes that weren't updated
//         });
//       });
//     } else {
//       // if id didnt match, add recipe to array
//       setAllRecipes((prevAllRecipes) => ([recipe, ...prevAllRecipes]));
//     }
//   }

//   // handle updating current recipe
//   const handleCurrentRecipe = (recipe) => {
//     setCurrentRecipe(recipe);
//     console.log(recipe, 'inside handler')
//     // navigate to page
//     navigate(`/recipes/${recipe.id}/`);
//   }

//   // handle initial state of favorite recipes
//   const updateFavoriteRecipes = (recipesData) => {
//     // get array with liked recipes, filter by isLiked
//     const likedRecipes = recipesData?.filter((recipe) => (
//       recipe.isLiked === true
//     ))
//     // set state with new array
//     setFavoriteRecipes(likedRecipes);
//   }

//   const filterFavorites = (recipeId) => {
//     setFavoriteRecipes((prev) => 
//       (prev.filter((favRecipe) => favRecipe.id !== recipeId)));
//   }

//   // handle adding or removing from favorite recipes
//   const handleFavorites = async (recipeId) => {
//     // check if recipe is in favorite recipes
//     const found = favoriteRecipes.find(
//       favRecipe => favRecipe.id === recipeId
//     );

//     // if recipe is liked, remove from favorites
//     if(found) {
//       filterFavorites(recipeId);
//       // send database request
//       await unlikeFavoriteRecipe(recipeId);
//       // if recipe isnt liked 
//     } else {
//       // add to favorite recipes
//       const newFav = allRecipes.find((r) => r.id === recipeId);
//       setFavoriteRecipes((prev) => ([newFav, ...prev]));
//       // send database request
//       await likeARecipe(recipeId);
//     }

//   }

//   // update latest recipe
//   const handleLatestRecipe = (recipe) => {
//     setLatestRecipe(recipe);
//   }

//   // filter all recipes based on recipeId
//   const handleFilterAllRecipes = (recipeId) => {

//     setAllRecipes((prevAllRecipes) => (
//       // filter by id
//       prevAllRecipes.filter((r) => (
//         r.id !== recipeId
//       ))
//     ))
//     // filter favorites
//     filterFavorites(recipeId);
//     // update latest recipe if ids match
//     latestRecipe.id === recipeId && setLatestRecipe(allRecipes[1]);
//   }



  return (
    <RecipeProvider>
    {/* navigation bar */}
      <NavBar />

    {/* main section */}
     <main>

      {/* routes */}
        <Routes>
          {/* navigate to home */}
          <Route path="/" element={<HomePage />} />
    
          {/* all recipes */}
          <Route path="/recipes/" element={<RecipesPage />} />

          {/* specific recipe */}
          <Route path={`/recipes/:id/`} element={<SpecificRecipePage />} />

          {/* specific recipe */}
          <Route path={`/notes/:id/`} element={<NotesPage />} />

          {/* favorite recipes */}
          <Route path="/favorites/" element={<RecipesPage />} />

          {/* add new recipe */}
          <Route path="/add/" element={<AddNewRecipePage />} />

          {/* catch all route */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

      </main>
      
      {/* footer */}
      <Footer />

    </RecipeProvider>
  )
}

export default App
