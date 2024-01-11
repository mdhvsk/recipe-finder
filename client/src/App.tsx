import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import NavComponent from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recipes from './components/Recipes';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SearchBar />} />
        <Route path='/recipes' element={<Recipes />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
