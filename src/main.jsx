import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import router
import { BrowserRouter as Router } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </Router>,
)
