// App.tsx
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddContactPage } from './components/AddContactPage';
import ResponsiveAppBar from './components/NavigationBar';
import {ShowContactsPage} from './components/Contacts';


const App = () => {
  return(
    <Router>
      <div className='app-container'>
    <ResponsiveAppBar />

    <Routes>
      <Route path="/add" element={<AddContactPage />} />
      <Route path="/contacts" element={<ShowContactsPage />} />
    </Routes>
    </div>
  </Router>

  )

};

export default App;
