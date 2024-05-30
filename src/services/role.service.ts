import { client } from "../config/axios";

export interface GetRolesRes {
  id?: string;
  name?: string;
  permissions?: string;
}

export const getRoles = async (): Promise<GetRolesRes> => {
  try {
    const response = await client.get("/role");
    return response.data;
  } catch (error) {
    throw error;
  }
};
