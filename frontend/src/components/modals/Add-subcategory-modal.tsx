import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategories, createSubCategory } from "@/services/categoryService";
import { toast } from "sonner";

interface AddSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSubCategoryModal({ isOpen, onClose }: AddSubCategoryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      getCategories()
        .then((data) => setCategories(data))
        .catch((error) => console.error("Failed to fetch categories:", error));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !subCategoryName) return;
    try {
      await createSubCategory(selectedCategory, subCategoryName);
      const category = categories.find((cat) => cat._id === selectedCategory);
      const categoryName = category ? category.name : "Unknown";
      toast.success(`Subcategory '${subCategoryName}' added to category '${categoryName}' successfully`);
      setSelectedCategory("");
      setSubCategoryName("");
      onClose();
    } catch (error) {
      console.error("Failed to create subcategory:", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to add subcategory: ${message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add Sub Category</h2>
        <div onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <select
                className="w-full border rounded-md p-2 mb-4"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
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
            <Button onClick={handleSubmit} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              ADD
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              DISCARD
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}