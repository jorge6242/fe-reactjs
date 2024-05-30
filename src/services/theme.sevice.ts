import { client } from '../config/axios';

export interface GetThemeRes {
  id: string;
  name: string
}

export const getThemeList = async (): Promise<GetThemeRes[]> => {
  const { data } = await client.get("/theme");
  return data;
};