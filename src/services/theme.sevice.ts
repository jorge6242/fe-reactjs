import { client } from "../config/axios";

export interface GetThemeRes {
  id: string;
  name: string;
}

export const getThemeList = async (search?: string): Promise<GetThemeRes[]> => {
  const { data } = await client.get("/theme", { params: { search } });
  return data;
};

export const createTheme = async (userData: GetThemeRes) => {
  try {
    const response = await client.post("/theme", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTheme = async (id: string, userData: GetThemeRes) => {
  try {
    const response = await client.put(`/theme/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
