import { client } from '../config/axios';

export interface GetCategoryRes {
  id: string;
  name: string
}

export const getCategoryList = async (): Promise<GetCategoryRes[]> => {
  const { data } = await client.get("/category");
  return data;
};

export const createCategory = async (userData: GetCategoryRes) => {
  try {
    const response = await client.post('/category', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id: string, userData: GetCategoryRes) => {
  try {
    const response = await client.put(`/category/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};