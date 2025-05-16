"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"
import { useNavigate } from "react-router-dom"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when clicking wishlist
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div
      className="border rounded-lg p-4 bg-white relative cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <button
        className={cn("absolute top-4 right-4 p-1 rounded-full z-10", isWishlisted ? "text-blue-500" : "text-gray-400")}
        onClick={handleWishlistClick}
      >
        <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <div className="block">
        <div className="flex justify-center mb-4">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={200}
            height={150}
            className="object-contain h-40"
          />
        </div>

        <h3 className="text-sm font-medium text-center mb-2">{product.title}</h3>

        <div className="text-center font-semibold mb-2">${product.price.toFixed(2)}</div>
      </div>
    </div>
  )
}
