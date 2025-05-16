
import type React from "react"

import { useState } from "react"

import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ProductVariant {
  id: string
  ram: string
  price: string
  quantity: string
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [variants, setVariants] = useState<ProductVariant[]>([{ id: "1", ram: "4 GB", price: "529.99", quantity: "1" }])
  const [selectedImages, setSelectedImages] = useState<string[]>([
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ])

  const addVariant = () => {
    const newVariant = {
      id: Date.now().toString(),
      ram: "",
      price: "",
      quantity: "",
    }
    setVariants([...variants, newVariant])
  }

  const updateVariant = (id: string, field: keyof ProductVariant, value: string) => {
    setVariants(variants.map((variant) => (variant.id === id ? { ...variant, [field]: value } : variant)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title :</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="HP AMD Ryzen 3" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Variants :</label>
              {variants.map((variant, index) => (
                <div key={variant.id} className="grid grid-cols-4 gap-2 mb-2">
                  <div>
                    <label className="block text-xs mb-1">Ram</label>
                    <Input
                      value={variant.ram}
                      onChange={(e) => updateVariant(variant.id, "ram", e.target.value)}
                      placeholder="4 GB"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">Price</label>
                    <Input
                      value={variant.price}
                      onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                      placeholder="529.99"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1">QTY</label>
                    <div className="flex">
                      <button
                        type="button"
                        className="border px-2 rounded-l"
                        onClick={() => {
                          const qty = Number.parseInt(variant.quantity) || 0
                          if (qty > 1) {
                            updateVariant(variant.id, "quantity", (qty - 1).toString())
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <Input
                        value={variant.quantity}
                        onChange={(e) => updateVariant(variant.id, "quantity", e.target.value)}
                        className="rounded-none text-center"
                      />
                      <button
                        type="button"
                        className="border px-2 rounded-r"
                        onClick={() => {
                          const qty = Number.parseInt(variant.quantity) || 0
                          updateVariant(variant.id, "quantity", (qty + 1).toString())
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addVariant}>
                Add variant
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sub category :</label>
              <select
                className="w-full border rounded-md p-2"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Select subcategory</option>
                <option value="hp">HP</option>
                <option value="dell">Dell</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description :</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="The Ryzen 3 is a more high-end processor that compares to the Intel Core i5..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Upload Image:</label>
              <div className="flex space-x-2 mt-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative border rounded p-1">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Product preview"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
                <div className="border rounded p-1 flex items-center justify-center w-[80px] h-[80px]">
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              DISCARD
            </Button>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              ADD
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
