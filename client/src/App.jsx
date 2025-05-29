import {Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./pages/Auth/Login.jsx"
import LandingPage from "./pages/Auth/LandingPage.jsx";
import Register from "./pages/Auth/Register.jsx";
import './App.css'
import Home from "./pages/Dashboard/Home.jsx"
function App() {
  return (
    <>
      <Toaster/>
        <Routes>

          {/* Landing Page Routes  */}
          <Route path="/" element={<LandingPage/>}>
           <Route index element={<Login />} />
           <Route path="login" element = {<Login/>}/>
           <Route path="register" element = {<Register/>}/>
          </Route>

           {/* Home Page */}
          <Route path="/home" element={<Home/>}/>
          
    
        </Routes>
     
    </>
  );
}

export default App;
