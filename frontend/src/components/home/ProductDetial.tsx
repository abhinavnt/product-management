import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";

interface ProductDetail {
    id: string;
    title: string;
    description?: string;
    images: string[];
    price: number;
    variants: {
        ram: string;
        price: number;
        quantity: number;
    }[];
    inStock?: boolean;
}

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [selectedRam, setSelectedRam] = useState<string>("");
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                
                const response = await axiosInstance.get(`/api/product/${id}`);
                console.log("API Response:", response.data);

                const productData: ProductDetail = {
                    ...response.data,
                    id: response.data._id,
                    inStock: response.data.variants?.some((v: any) => v.quantity > 0) ?? false,
                    price: response.data.variants?.[0]?.price ?? 0,
                };
                setProduct(productData);
                setSelectedImage(productData.images[0] || "/placeholder.svg");
                setSelectedRam(productData.variants?.[0]?.ram || "");
            } catch (err: any) {
                console.error("Error fetching product:", err.response?.data || err.message);
                setError("Failed to fetch product details: " + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleQuantityChange = (value: number) => {
        if (value < 1) return;
        const selectedVariant = product?.variants?.find((v) => v.ram === selectedRam);
        if (selectedVariant && value > selectedVariant.quantity) return;
        setQuantity(value);
    };

    const handleRamSelection = (ram: string) => {
        setSelectedRam(ram);
        if (product) {
            const variant = product.variants?.find((v) => v.ram === ram);
            if (variant) {
                setProduct({
                    ...product,
                    price: variant.price,
                });
            }
        }
    };

    const handleBuyNow = () => {
        console.log("Buy now clicked", {
            productId: id,
            quantity,
            selectedRam,
        });
    };

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-200 rounded-lg h-80"></div>
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-10 bg-gray-200 rounded w-1/2 mt-6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Product not found</h2>
                    <p className="mt-2">{error || "The product you're looking for doesn't exist or has been removed."}</p>
                    <Link to="/" className="text-primary hover:underline mt-4 inline-block">
                        Return to home
                    </Link>
                </div>
            </div>
        );
    }

    const selectedVariant = product.variants?.find((v) => v.ram === selectedRam);
    const stockQuantity = selectedVariant?.quantity ?? 0;

    return (
        <div className="container mx-auto px-4 py-6">
            <nav className="flex items-center text-sm mb-6">
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-gray-700">Product details</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-white flex items-center justify-center h-80">
                        <img
                            src={selectedImage || product.images[0] || "/placeholder.svg"}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "border rounded-lg p-2 cursor-pointer w-24 h-24 flex items-center justify-center",
                                    selectedImage === image ? "border-primary" : "border-gray-200",
                                )}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`${product.title} - view ${index + 1}`}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Availability:</span>
                        {product.inStock ? (
                            <span className="text-green-600 flex items-center">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-1"></span>
                                In stock
                            </span>
                        ) : (
                            <span className="text-red-600">Out of stock</span>
                        )}
                    </div>

                    {selectedVariant && stockQuantity <= 50 && stockQuantity > 0 && (
                        <div className="text-amber-600 text-sm">
                            Hurry up! only {stockQuantity} product left in stock!
                        </div>
                    )}

                    <div className="border-t border-gray-200 my-6 pt-6">
                        {product.variants && product.variants.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-medium mb-2">RAM:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.ram}
                                            className={cn(
                                                "px-4 py-2 border rounded-md text-sm",
                                                selectedRam === variant.ram
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400",
                                            )}
                                            onClick={() => handleRamSelection(variant.ram)}
                                        >
                                            {variant.ram}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="font-medium mb-2">Quantity:</h3>
                            <div className="flex items-center">
                                <button
                                    className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                                    className="border-y border-gray-300 p-2 w-12 text-center focus:outline-none"
                                    min="1"
                                    max={stockQuantity || undefined}
                                />
                                <button
                                    className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= stockQuantity}
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" className="flex-1">
                                Edit product
                            </Button>
                            <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white" onClick={handleBuyNow}>
                                Buy it now
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("rounded-full", isWishlisted ? "text-primary" : "text-gray-400")}
                                onClick={toggleWishlist}
                            >
                                <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
                            </Button>
                        </div>
                    </div>

                    {product.description && (
                        <div className="mt-8">
                            <h3 className="font-medium mb-2">Description:</h3>
                            <p className="text-gray-700">{product.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}