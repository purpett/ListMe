import logo from './logo.svg';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar';
import Homepage from './Homepage';
import PageNotFound from './PageNotFound'
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        { }
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
