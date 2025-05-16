import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import { useAppDispatch } from "@/redux/store";
import { setSelectedSubcategories } from "@/redux/features/productsSlice";

type Category = {
  id: string;
  name: string;
  subcategories?: Subcategory[];
};

type Subcategory = {
  id: string;
  name: string;
  checked: boolean;
};

export function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/category/categories-with-subcategories");
        const fetchedCategories = response.data;

        const mappedCategories: Category[] = [
          { id: "all", name: "All categories" },
          ...fetchedCategories.map((cat: any) => ({
            id: cat._id,
            name: cat.name,
            subcategories: cat.subcategories.map((sub: any) => ({
              id: sub._id,
              name: sub.name,
              checked: false,
            })),
          })),
        ];
        setCategories(mappedCategories);

        const initialExpanded = fetchedCategories.reduce(
          (acc: Record<string, boolean>, cat: any) => {
            if (cat.subcategories.length > 0) {
              acc[cat._id] = true;
            }
            return acc;
          },
          {}
        );
        setExpandedCategories(initialExpanded);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleSubcategoryChange = (categoryId: string, subcategoryId: string) => {
    setCategories((prevCategories) => {
      const newCategories = prevCategories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories?.map((sub) =>
                sub.id === subcategoryId ? { ...sub, checked: !sub.checked } : sub
              ),
            }
          : cat
      );

      const selected = newCategories
        .flatMap((cat) => cat.subcategories || [])
        .filter((sub) => sub.checked)
        .map((sub) => sub.id);
      dispatch(setSelectedSubcategories(selected));

      return newCategories;
    });
  };

  const handleAllCategoriesClick = () => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => ({
        ...cat,
        subcategories: cat.subcategories?.map((sub) => ({ ...sub, checked: false })),
      }))
    );
    dispatch(setSelectedSubcategories([]));
  };

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
                <span
                  className={cn("text-sm cursor-pointer", category.id === "all" && "font-medium")}
                  onClick={category.id === "all" ? handleAllCategoriesClick : undefined}
                >
                  {category.name}
                </span>
              </div>
            </div>

            {category.subcategories && expandedCategories[category.id] && (
              <ul className="ml-6 mt-1 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subcategory.id}
                      checked={subcategory.checked}
                      onChange={() => handleSubcategoryChange(category.id, subcategory.id)}
                      className="mr-2 h-4 w-4 rounded border-gray-300"
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
  );
}