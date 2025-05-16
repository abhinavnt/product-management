import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/services/categoryService";
import { toast } from "sonner";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName) return;
    try {
      await createCategory(categoryName);
      toast.success(`Category '${categoryName}' added successfully`);
      setCategoryName("");
      onClose();
    } catch (error) {
      console.error("Failed to create category:", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to add category: ${message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        <div onSubmit={handleSubmit}>
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