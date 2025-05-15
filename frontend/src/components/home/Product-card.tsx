
import { Heart } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"
import { Link } from "react-router-dom"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="border rounded-lg p-4 bg-white relative">
      <button
        className={cn("absolute top-4 right-4 p-1 rounded-full", isWishlisted ? "text-blue-500" : "text-gray-400")}
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <Link to={`/product/${product.id}`} className="block">
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

        <div className="flex justify-center">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn("h-4 w-4", i < product.rating ? "text-yellow-400" : "text-gray-300")}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}
