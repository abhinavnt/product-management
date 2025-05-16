import type React from "react"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"
import { useNavigate } from "react-router-dom"
import axiosInstance from "@/utils/axiosInstance"
import { useAppSelector } from "@/redux/store"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  // Fetch initial wishlist status when component mounts
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/wishlist/${user?._id}`);
        const wishlisted = data.products.includes(product.id);
        setIsWishlisted(wishlisted);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };
    fetchWishlistStatus();
  }, [product.id]);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await axiosInstance.delete(`/api/wishlist/${product.id}/${user?._id}`);
        setIsWishlisted(false);
      } else {
        await axiosInstance.post(`/api/wishlist/${product.id}/${user?._id}`);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  };

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
  );
}