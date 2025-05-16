"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Plus, Minus, Check, X } from "lucide-react"
import ReactCrop, { type Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { fetchCategories, addProduct } from "@/services/productService"
import { toast } from "sonner"

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

interface Category {
  _id: string
  name: string
  parentId: string | null
  subcategories?: Category[]
}

// UI Components
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
}) => {
  const baseClasses = "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500",
    outline: "border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
  }

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${className}`}
      {...props}
    />
  )
}

const Textarea = ({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${className}`}
      {...props}
    />
  )
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [variants, setVariants] = useState<ProductVariant[]>([{ id: "1", ram: "", price: "", quantity: "1" }])
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 100, height: 100, x: 0, y: 0 })
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)
  const [croppingIndex, setCroppingIndex] = useState<number | null>(null)
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [pendingImages, setPendingImages] = useState<File[]>([])
  const [pendingPreviews, setPendingPreviews] = useState<string[]>([])
  const [currentPendingIndex, setCurrentPendingIndex] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories()
        setCategories(response)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    if (isOpen) loadCategories()
  }, [isOpen])

  const addVariant = () => {
    const newVariant = { id: Date.now().toString(), ram: "", price: "", quantity: "1" }
    setVariants([...variants, newVariant])
  }

  const updateVariant = (id: string, field: keyof ProductVariant, value: string) => {
    setVariants(variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
    setErrors((prev) => ({ ...prev, [`variant-${id}-${field}`]: "" }))
  }

  const incrementQuantity = (id: string) => {
    setVariants((prevVariants) =>
      prevVariants.map((v) => (v.id === id ? { ...v, quantity: (Number.parseInt(v.quantity) || 0) + 1 + "" } : v)),
    )
  }

  const decrementQuantity = (id: string) => {
    setVariants((prevVariants) =>
      prevVariants.map((v) =>
        v.id === id && (Number.parseInt(v.quantity) || 0) > 1
          ? { ...v, quantity: Number.parseInt(v.quantity) - 1 + "" }
          : v,
      ),
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    // Get all selected files
    const files = Array.from(e.target.files)
    const remainingSlots = 4 - selectedImages.length
    const filesToProcess = files.slice(0, remainingSlots)

    if (filesToProcess.length === 0) return

    // Create object URLs for previews
    const newPreviews = filesToProcess.map((file) => URL.createObjectURL(file))

    // Set pending images for cropping
    setPendingImages(filesToProcess)
    setPendingPreviews(newPreviews)
    setCurrentPendingIndex(0)
    setCroppingIndex(0)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleCropComplete = (crop: Crop) => {
    setCompletedCrop(crop)
  }

  const confirmCrop = async () => {
    if (imageRef && completedCrop && completedCrop.width && completedCrop.height && croppingIndex !== null) {
      const canvas = document.createElement("canvas")
      const scaleX = imageRef.naturalWidth / imageRef.width
      const scaleY = imageRef.naturalHeight / imageRef.height

      canvas.width = completedCrop.width * scaleX
      canvas.height = completedCrop.height * scaleY

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.drawImage(
        imageRef,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
      )

      const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.95))

      const croppedFile = new File([blob], pendingImages[currentPendingIndex].name, {
        type: "image/jpeg",
      })

      // Add the cropped image to the selected images
      setSelectedImages((prev) => [...prev, croppedFile])
      setImagePreviews((prev) => [...prev, URL.createObjectURL(croppedFile)])

      // Move to next pending image or finish
      const nextIndex = currentPendingIndex + 1
      if (nextIndex < pendingImages.length) {
        setCurrentPendingIndex(nextIndex)
        setCroppingIndex(nextIndex)
        setCompletedCrop(null)
      } else {
        // Clear pending images
        setPendingImages([])
        setPendingPreviews([])
        setCroppingIndex(null)
        setCompletedCrop(null)
      }
    }
  }

  const cancelCrop = () => {
    // Skip current image and move to next
    const nextIndex = currentPendingIndex + 1
    if (nextIndex < pendingImages.length) {
      setCurrentPendingIndex(nextIndex)
      setCroppingIndex(nextIndex)
      setCompletedCrop(null)
    } else {
      // Clear pending images
      setPendingImages([])
      setPendingPreviews([])
      setCroppingIndex(null)
      setCompletedCrop(null)
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!title.trim()) newErrors.title = "Title is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!selectedCategory) newErrors.category = "Category is required"
    if (!subCategory) newErrors.subcategory = "Subcategory is required"
    if (selectedImages.length === 0) newErrors.images = "At least one image is required"

    variants.forEach((variant) => {
      if (!variant.ram.trim()) {
        newErrors[`variant-${variant.id}-ram`] = "RAM is required"
      }
      if (!variant.price || isNaN(Number(variant.price)) || Number(variant.price) <= 0) {
        newErrors[`variant-${variant.id}-price`] = "Price must be a positive number"
      }
      if (!variant.quantity || isNaN(Number(variant.quantity)) || Number(variant.quantity) < 1) {
        newErrors[`variant-${variant.id}-quantity`] = "Quantity must be at least 1"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("subcategory", subCategory)
    formData.append(
      "variants",
      JSON.stringify(
        variants.map((v) => ({
          ram: v.ram,
          price: Number(v.price),
          quantity: Number(v.quantity),
        })),
      ),
    )

    selectedImages.forEach((image) => formData.append("images", image))

    try {
      await addProduct(formData)
      onClose()
      toast.success("Product Added Success")
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const openFileInput = () => {
    fileInputRef.current?.click()
  }

  if (!isOpen) return null

  const selectedCategoryData = categories.find((cat) => cat._id === selectedCategory)
  const subCategories = selectedCategoryData?.subcategories || []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title:</label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setErrors((prev) => ({ ...prev, title: "" }))
              }}
              placeholder="HP AMD Ryzen 3"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Variants:</label>
            {variants.map((variant) => (
              <div key={variant.id} className="grid grid-cols-4 gap-2 mb-2">
                <div>
                  <label className="block text-xs mb-1">Ram</label>
                  <Input
                    value={variant.ram}
                    onChange={(e) => updateVariant(variant.id, "ram", e.target.value)}
                    placeholder="4 GB"
                  />
                  {errors[`variant-${variant.id}-ram`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`variant-${variant.id}-ram`]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs mb-1">Price</label>
                  <Input
                    value={variant.price}
                    onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                    placeholder="529.99"
                    type="number"
                  />
                  {errors[`variant-${variant.id}-price`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`variant-${variant.id}-price`]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs mb-1">QTY</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="border px-2 py-2 rounded-l flex items-center justify-center"
                      onClick={() => decrementQuantity(variant.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="border-t border-b py-2 px-3 flex items-center justify-center min-w-[40px]">
                      {variant.quantity}
                    </div>
                    <button
                      type="button"
                      className="border px-2 py-2 rounded-r flex items-center justify-center"
                      onClick={() => incrementQuantity(variant.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {errors[`variant-${variant.id}-quantity`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`variant-${variant.id}-quantity`]}</p>
                  )}
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addVariant}>
              Add variant
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category:</label>
            <select
              className="w-full border rounded-md p-2"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setSubCategory("")
                setErrors((prev) => ({ ...prev, category: "", subcategory: "" }))
              }}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subcategory:</label>
            <select
              className="w-full border rounded-md p-2"
              value={subCategory}
              onChange={(e) => {
                setSubCategory(e.target.value)
                setErrors((prev) => ({ ...prev, subcategory: "" }))
              }}
              disabled={!selectedCategory}
            >
              <option value="">Select subcategory</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
            {errors.subcategory && <p className="text-red-500 text-xs mt-1">{errors.subcategory}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description:</label>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                setErrors((prev) => ({ ...prev, description: "" }))
              }}
              placeholder="The Ryzen 3 is a more high-end processor..."
              className="min-h-[100px]"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />

            {/* Cropping UI */}
            {croppingIndex !== null && pendingPreviews.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">
                  Crop Image {currentPendingIndex + 1} of {pendingPreviews.length}
                </div>
                <div className="border rounded p-2 bg-gray-50">
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={handleCropComplete}
                    aspect={1} // Enforce 1:1 aspect ratio
                    className="max-h-[300px] overflow-hidden flex justify-center"
                  >
                    <img
                      src={pendingPreviews[currentPendingIndex] || "/placeholder.svg"}
                      alt="Crop preview"
                      onLoad={(e) => setImageRef(e.currentTarget)}
                      className="max-h-[300px] object-contain"
                    />
                  </ReactCrop>
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button type="button" variant="outline" size="sm" onClick={cancelCrop}>
                      <X className="h-4 w-4 mr-1" /> Skip
                    </Button>
                    <Button type="button" size="sm" onClick={confirmCrop}>
                      <Check className="h-4 w-4 mr-1" /> Confirm Crop
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Images */}
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative border rounded p-1 group">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Product preview ${index + 1}`}
                    className="w-[80px] h-[80px] object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {selectedImages.length < 4 && !croppingIndex && (
                <div
                  className="border rounded p-1 flex items-center justify-center w-[80px] h-[80px] cursor-pointer hover:bg-gray-50"
                  onClick={openFileInput}
                >
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            DISCARD
          </Button>
          <Button type="button" disabled={croppingIndex !== null} onClick={handleSubmit}>
            ADD
          </Button>
        </div>
      </div>
    </div>
  )
}

// Demo component to show the modal
export default function Demo() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}