import{BrowserRouter as Router,Routes,Route}from"react-router-dom";
import React from "react";
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Sidebar from "./components/sidebar";
  



function App(){
  return(
    <Router>
      <div className="app-wrapper">
       { /* fixed navbar and sidebar*/}
       <Navbar/>


       <div className="main content">
        {/* sidebbar*/}
        <Sidebar/>


        {/*pages*/}
        <div className="content">
          <Routes>
            <Route path="./pages/Dashboard.jsx"/>
          </Routes>
        </div>

       </div>
      </div>
    </Router>
  )
}







export default App;