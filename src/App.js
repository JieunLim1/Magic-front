import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from './pages/about';
import Dashboard from './pages/dashboard';
import Plan from './pages/plan';
import Nav from './components/NavBar';
import Project from './pages/project';
import Starter from './components/starter';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/plan' element={<Plan />} />
          <Route path='/project/:id' element={<Project />} />
        </Routes> 
        <Starter/>
      </div>
    </BrowserRouter>

   
  );
}

export default App;


