import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import About from './pages/about';
import Dashboard from './pages/dashboard';
import Plan from './pages/plan';
import Nav from './components/NavBar';
import Project from './pages/project';
import Landing from './pages/landing';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/magic" />} />
          <Route path='/about' element={<About />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/plan' element={<Plan />} />
          <Route path='/project/:id' element={<Project />} />
          <Route path='/magic' element={<Landing/>}/>
        </Routes>
      </div>
    </BrowserRouter>

   
  );
}

export default App;


