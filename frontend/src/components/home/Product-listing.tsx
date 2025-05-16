

import { useState } from "react"
import { Button } from "@/components/ui/button"

import { dummyProducts } from "@/data/products"
import { ProductCard } from "./Product-card"
import { AddProductModal } from "../modals/Add-product-modal"
import { AddCategoryModal } from "../modals/Add-category-modal"
import { AddSubCategoryModal } from "../modals/Add-subcategory-modal"
import { Pagination } from "../pagination/Pagination"

export function ProductListing() {
  const [products, setProducts] = useState(dummyProducts)
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
  const [isAddSubCategoryModalOpen, setIsAddSubCategoryModalOpen] = useState(false)

  return (
    <main className="flex-1 p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Home</span>
          <span className="text-sm">&gt;</span>
        </div>
        <div className="ml-auto flex space-x-2">
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => setIsAddCategoryModalOpen(true)}
          >
            Add category
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => setIsAddSubCategoryModalOpen(true)}
          >
            Add sub category
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            Add product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination />

      <AddProductModal isOpen={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)} />

      <AddCategoryModal isOpen={isAddCategoryModalOpen} onClose={() => setIsAddCategoryModalOpen(false)} />

      <AddSubCategoryModal isOpen={isAddSubCategoryModalOpen} onClose={() => setIsAddSubCategoryModalOpen(false)} />
    </main>
  )
}
