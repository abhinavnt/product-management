import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";
import Home from "./pages/Home";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<SignInPage/>}/>
      <Route path="/signUp" element={<SignUpPage/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
