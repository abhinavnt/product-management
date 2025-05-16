

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddSubCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddSubCategoryModal({ isOpen, onClose }: AddSubCategoryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [subCategoryName, setSubCategoryName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add Sub Category</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <select
                className="w-full border rounded-md p-2 mb-4"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="laptop">Laptop</option>
                <option value="tablet">Tablet</option>
                <option value="headphones">Headphones</option>
              </select>

              <Input
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                placeholder="Enter sub category name"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              ADD
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              DISCARD
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
