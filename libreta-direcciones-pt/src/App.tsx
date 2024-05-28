// App.tsx
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddContactPage } from './components/AddContactPage';
import ResponsiveAppBar from './components/NavigationBar';
import {ShowContactsPage} from './components/Contacts';
import {FavoritesPage} from './components/Favorites';



const App = () => {
  return(
    <Router>
      <div className='app-container'>
    <ResponsiveAppBar />

    <Routes>
    <Route path="/" element={<AddContactPage />} />
      <Route path="/add" element={<AddContactPage />} />
      <Route path="/contacts" element={<ShowContactsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />

    </Routes>
    </div>
  </Router>

  )

};

export default App;
