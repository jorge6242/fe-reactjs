import { client } from "../config/axios";
import { User } from './user.service';

export interface LoginRes {
  user: User;
  token: string;
}

export const login = async (email: string): Promise<LoginRes> => {
  try {
    const response = await client.post("/user/login", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
