export interface Product {
  id: string
  title: string
  price: number
  image: string
  rating: number
  variants?: ProductVariant[]
  category?: string
  subCategory?: string
  description?: string
}

export interface ProductVariant {
  id: string
  ram: string
  price: number
  quantity: number
}
