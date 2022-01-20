import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Landing';
import Home from './components/Home';

import Detail from './components/Detail';
import RecipeCreator from './components/RecipeCreator';
/* import NavBar from './components/NavBar'; */


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavBar /> */}
        <Routes>
          <Route exact path = '/' element = { <LandingPage /> } />
          <Route path = '/home' element = { <Home /> } />
          <Route path = '/detail/:id' element = { <Detail /> } />
          <Route path = '/form' element = { <RecipeCreator /> } />
        </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;
