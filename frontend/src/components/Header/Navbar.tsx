

import { Heart, ShoppingCart, User } from "lucide-react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { WishlistSidebar } from "../sidebar/Wishlist-sidebar"
import { userLogout } from "@/services/authService"
import { useDispatch, useSelector } from "react-redux"

export function Header() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [logoutTrigger, setLogoutTrigger] = useState(false);

  const dispactch = useDispatch()

  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user)

  console.log("user", user);


  useEffect(() => {

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, logoutTrigger]);



  const handleLogout = async () => {

    const response = await userLogout(dispactch)
    if (response.status === 200) {
      localStorage.clear()
      setLogoutTrigger(prev => !prev)
    }

  }

  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">


        <div className="flex items-center space-x-2 max-w-md w-full mx-auto">
          <Input type="text" placeholder="Search any things" className="bg-white text-black rounded-md" />
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md">Search</Button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1" onClick={() => setIsWishlistOpen(true)}>
            <Heart className="h-5 w-5" />
            <span className="hidden sm:inline">0</span>
          </button>

          <div onClick={handleLogout} className="flex items-center space-x-1">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Log Out</span>
          </div>

          <Link to="/cart" className="flex items-center space-x-1">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-yellow-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </Link>
        </div>
      </div>

      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </header>
  )
}
