import {Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <Toaster/>
        <Routes>
          <Route path="/" element={<LandingPage/>}>
           <Route index element={<Login />} />
          <Route path="login" element = {<Login/>}/>
          <Route path="register" element = {<Register/>}/>
          </Route>
        </Routes>
     
    </>
  );
}

export default App;
