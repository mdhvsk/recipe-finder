import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import NavComponent from './components/NavBar';


const onLogout = (): string => {
  return 'string'
}
function App() {
  return (
    <div>
      <NavComponent onLogout={onLogout} />
      <SearchBar />
    </div>
  );
}

export default App;
