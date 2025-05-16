import { useState, useEffect } from 'react';

import type { Product } from '@/types/product';
import { X } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';
import { useSelector } from 'react-redux';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistSidebar({ isOpen, onClose }: WishlistSidebarProps) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: any) => state.auth.user);

  const fetchWishlistProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`api/wishlist/products/${user._id}`);
      console.log(response.data.products,"hello from ");
      
      setWishlistItems(response.data.products);
    } catch (err) {
      setError('Failed to fetch wishlist products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWishlistProducts();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white shadow-lg flex flex-col h-full">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Wishlist Items</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && wishlistItems.length === 0 && <p>Your wishlist is empty.</p>}
          {wishlistItems.map((item,index) => (
            <WishlistItem key={index} userId={user._id} product={item} onRemove={fetchWishlistProducts} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface WishlistItemProps {
  product: Product;
  userId: string;
  onRemove: () => void;
}

function WishlistItem({ product, userId, onRemove }: WishlistItemProps) {

  console.log(product,"product itertain");
  

  const handleRemove = async () => {
    try {
      await axiosInstance.delete(`/api/wishlist/${product._id}/${userId}`);
      onRemove();
    } catch (error) {
      console.error('Failed to remove from wishlist', error);
    }
  };

  return (
    <div className="flex items-center p-2 border rounded-lg mb-3">
      <div className="flex-shrink-0 mr-4">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-sm text-black font-medium">{product.title}</h3>
        {/* <div className="text-sm text-black font-semibold mt-1">${product.price}</div> */}
        <div className="flex mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-3 w-3 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      <button onClick={handleRemove} className="ml-2 text-gray-400 hover:text-gray-600">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}