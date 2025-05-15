

import { Heart, ShoppingCart, User } from "lucide-react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { WishlistSidebar } from "../sidebar/Wishlist-sidebar"

export function Header() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

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

          <Link to="/signin" className="flex items-center space-x-1">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Sign in</span>
          </Link>

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
