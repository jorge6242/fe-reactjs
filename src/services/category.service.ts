import { client } from '../config/axios';

export interface GetCategoryRes {
  id: string;
  name: string
}

export const getCategoryList = async (): Promise<GetCategoryRes[]> => {
  const { data } = await client.get("/category");
  return data;
};