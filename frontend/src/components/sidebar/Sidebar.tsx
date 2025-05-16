
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Category = {
  id: string
  name: string
  subcategories?: Category[]
  checked?: boolean
}

const dummyCategories: Category[] = [
  {
    id: "all",
    name: "All categories",
  },
  {
    id: "laptop",
    name: "Laptop",
    subcategories: [
      { id: "hp", name: "HP", checked: true },
      { id: "dell", name: "Dell" },
    ],
  },
  {
    id: "tablet",
    name: "Tablet",
    subcategories: [],
  },
  {
    id: "headphones",
    name: "Headphones",
    subcategories: [],
  },
]

export function Sidebar() {
  const [categories, setCategories] = useState<Category[]>(dummyCategories)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    laptop: true,
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  return (
    <aside className="w-64 border-r p-4 hidden md:block">
      <h2 className="font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {category.id !== "all" && category.subcategories?.length ? (
                  <button onClick={() => toggleCategory(category.id)} className="mr-1">
                    {expandedCategories[category.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <span className="w-5" />
                )}
                <span className={cn("text-sm", category.id === "all" && "font-medium")}>{category.name}</span>
              </div>
            </div>

            {category.subcategories && expandedCategories[category.id] && (
              <ul className="ml-6 mt-1 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subcategory.id}
                      checked={subcategory.checked || false}
                      className="mr-2 h-4 w-4 rounded border-gray-300"
                      readOnly
                    />
                    <label htmlFor={subcategory.id} className="text-sm">
                      {subcategory.name}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}
