import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<SignInPage/>}/>
      <Route path="/signUp" element={<SignUpPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
