
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("")

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
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
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
