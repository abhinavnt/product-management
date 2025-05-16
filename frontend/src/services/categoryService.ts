import axiosInstance from "@/utils/axiosInstance";

export const createCategory = async (name: string) => {
  const response = await axiosInstance.post("/api/category/categories", { name });
  return response.data;
};

export const createSubCategory = async (parentId: string, name: string) => {
  const response = await axiosInstance.post(`/api/category/categories/${parentId}/subcategories`, { name });
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get("/api/category/categories");
  return response.data;
};