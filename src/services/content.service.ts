import { client } from "../config/axios";

export interface GetContentRes {
  _id: string;
  name: string;
  categoryId: string;
  themeId: string;
  theme: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
    description: string;
  };
}

export interface ContentPayload {
  name: string;
  themeId: string;
  categoryId: string;
  userId: string;
}

export const getContentList = async (
  search?: string
): Promise<GetContentRes[]> => {
  const { data } = await client.get("/content", { params: { search } });
  console.log("data ", data);
  return data;
};

export const createContent = async (contentData: ContentPayload) => {
  try {
    const { data } = await client.post("/content", contentData);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateContent = async (
  id: string,
  contentData: ContentPayload
) => {
  try {
    const { data } = await client.put(`/content/${id}`, contentData);
    return data;
  } catch (error) {
    return error;
  }
};
