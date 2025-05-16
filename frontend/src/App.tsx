import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAppSelector } from "./redux/store";
import { refreshToken } from "./services/authService";
import { Toaster } from "sonner";
import ProductDetailPage from "./pages/ProductDetials";
import ProductDetials from "./pages/ProductDetials";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);


  useEffect(() => {
    const fetchUser = async () => {
      console.log("user fetch chyunnuuu");

      const urlParams = new URLSearchParams(window.location.search);
      const authStatus = urlParams.get('auth');

      if (authStatus === 'success') {
        localStorage.setItem("isAuthenticated", "true");
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      const storedAuth = localStorage.getItem("isAuthenticated");
      if (storedAuth) {
        try {
          await refreshToken(dispatch);
        } catch (error) {
          console.log("Error during token refresh", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <BrowserRouter>
      <Toaster richColors  />
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetials />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
