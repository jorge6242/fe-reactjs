import { IUserForm } from '../components/UserForm';
import { client } from '../config/axios';

export interface User {
  id?: number;
  alias: string;
  email: string;
  userType: string;
  roles: string[];
}

export const getUserList = async (): Promise<User[]> => {
  try {
    const response = await client.get('/user');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData: IUserForm): Promise<User> => {
  try {
    const response = await client.post('/user', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, userData: IUserForm): Promise<User> => {
  try {
    const response = await client.put(`user/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
