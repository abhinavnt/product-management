export interface Product {
  _id?:string
  id: string
  title: string
  price: number
  images: string
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
