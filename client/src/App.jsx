import {Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./pages/Login";
function App() {
  return (
    <>
      <Toaster/>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
     
    </>
  );
}

export default App;
