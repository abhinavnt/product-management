import type React from "react"

import { useState } from "react"
import { z } from "zod"

type FieldConfig = {
  name: string
  type: string
  placeholder?: string
  icon: React.ReactNode
  validation?: z.ZodType<any>
}

type FormProps = {
  fields: FieldConfig[]
  onSubmit: (data: Record<string, string>) => Promise<void>
  submitText: string
  isSubmitting: boolean
  error?: string
}

export function AuthForm({ fields, onSubmit, submitText, isSubmitting, error }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.name, ""])),
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      if (field.validation) {
        try {
          field.validation.parse(formData[field.name])
        } catch (error) {
          if (error instanceof z.ZodError) {
            newErrors[field.name] = error.errors[0].message
          }
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="relative">
          <div className="flex items-center bg-[#f2f7f2] rounded-md px-4 py-3">
            <span className="text-gray-400 mr-2">{field.icon}</span>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder || field.name}
              className="bg-transparent w-full outline-none text-gray-700"
            />
          </div>
          {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#f5a623] hover:bg-[#e69816] text-white font-medium py-3 px-4 rounded-full transition-colors"
      >
        {isSubmitting ? "Processing..." : submitText}
      </button>
    </form>
  )
}
