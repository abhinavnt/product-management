import type { Product } from "@/types/product";


export const dummyProducts: Product[] = [
  {
    id: "1",
    title: "HP AMD Ryzen 3",
    price: 529.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    variants: [
      { id: "1-1", ram: "4 GB", price: 529.99, quantity: 10 },
      { id: "1-2", ram: "8 GB", price: 629.99, quantity: 5 },
    ],
    category: "laptop",
    subCategory: "hp",
    description:
      "The Ryzen 3 is a more high-end processor that compares to the Intel Core i5 series. It offers excellent performance for everyday tasks and light gaming.",
  },
  {
    id: "2",
    title: "HP AMD Ryzen 3",
    price: 529.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    variants: [
      { id: "2-1", ram: "4 GB", price: 529.99, quantity: 8 },
      { id: "2-2", ram: "8 GB", price: 629.99, quantity: 3 },
    ],
    category: "laptop",
    subCategory: "hp",
  },
  {
    id: "3",
    title: "HP AMD Ryzen 3",
    price: 529.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 3,
    variants: [
      { id: "3-1", ram: "4 GB", price: 529.99, quantity: 12 },
      { id: "3-2", ram: "8 GB", price: 629.99, quantity: 7 },
    ],
    category: "laptop",
    subCategory: "hp",
  },
  {
    id: "4",
    title: "HP AMD Ryzen 3",
    price: 529.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    variants: [
      { id: "4-1", ram: "4 GB", price: 529.99, quantity: 15 },
      { id: "4-2", ram: "8 GB", price: 629.99, quantity: 9 },
    ],
    category: "laptop",
    subCategory: "hp",
  },
  {
    id: "5",
    title: "HP AMD Ryzen 3",
    price: 529.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    variants: [
      { id: "5-1", ram: "4 GB", price: 529.99, quantity: 6 },
      { id: "5-2", ram: "8 GB", price: 629.99, quantity: 4 },
    ],
    category: "laptop",
    subCategory: "hp",
  },
  {
    id: "6",
    title: "HP AMD Ryzen 3",
    price: 529.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    variants: [
      { id: "6-1", ram: "4 GB", price: 529.99, quantity: 11 },
      { id: "6-2", ram: "8 GB", price: 629.99, quantity: 8 },
    ],
    category: "laptop",
    subCategory: "hp",
  },
]
