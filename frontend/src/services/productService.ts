import axiosInstance from "@/utils/axiosInstance";

interface Category {
  _id: string;
  name: string;
  parentId: string | null;
  subcategories?: Category[];
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get("/api/category/categories-with-subcategories");
  return response.data;
};

export const addProduct = async (formData: FormData): Promise<void> => {
  await axiosInstance.post("/api/product/addProduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};