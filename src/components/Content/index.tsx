import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import DataTable from "../DataTable";
import CustomModal from "../Modal";
import {
  getContentList,
  createContent,
  updateContent,
  GetContentRes,
} from "../../services/content.service";
import { IContentFormData } from "../ContentForm";
import { GetThemeRes, getThemeList } from "../../services/theme.sevice";
import {
  GetCategoryRes,
  getCategoryList,
} from "../../services/category.service";
import ContentForm from "../ContentForm";
import useSnackbarStore from "../../store/useSnackbarStore";
import SearchBar from '../SearchBar';

const contentDefault: GetContentRes = {
  _id: "",
  name: "",
  categoryId: "",
  themeId: "",
  theme: {
    _id: "",
    name: "",
  },
  category: {
    _id: "",
    name: "",
    description: "",
  },
};

const ContentAdmin: React.FC = () => {
  const [contents, setContents] = useState<GetContentRes[]>([]);
  const [themes, setThemes] = useState<GetThemeRes[]>([]);
  const [categories, setCategories] = useState<GetCategoryRes[]>([]);
  const [selectedContent, setSelectedContent] =
    useState<GetContentRes>(contentDefault);
  const [modalOpen, setModalOpen] = useState(false);
  const localUser = localStorage.getItem("user");
  const setMessage = useSnackbarStore((state) => state.setMessage);

  useEffect(() => {
    const fetchContents = async () => {
      const contentList = await getContentList();
      setContents(contentList);
      const themeList = await getThemeList();
      setThemes(themeList);
      const categoryList = await getCategoryList();
      setCategories(categoryList);
    };

    fetchContents();
  }, []);

  const handleSelectRow = (content: GetContentRes) => {
    setSelectedContent(content);
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedContent(contentDefault);
    setModalOpen(true);
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      const contentList = await getContentList(searchTerm);
      setContents(contentList);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Failed to fetch users', 'error');
    }
  };

  const handleSubmit = async (contentData: IContentFormData) => {
    const currentUser = JSON.parse(localUser as string);
    let res = null;
    const payload = {
      name: contentData.name,
      themeId: contentData.themeId,
      categoryId: contentData.categoryId,
      userId: currentUser ? currentUser.id : "",
    };
    if (selectedContent && selectedContent._id) {
      res = await updateContent(selectedContent._id, payload);
    } else {
      res = await createContent(payload);
    }

    if (res?.response?.data.message === "Access denied.") {
      setMessage("No tiene permisos para esta operación", "error");
    } else {
      setMessage(
        `Registro ${
          selectedContent && selectedContent._id ? "Actualizado" : "Creado"
        }`,
        "success"
      );
    }

    const updatedContents = await getContentList();
    setContents(updatedContents);
    setModalOpen(false);
    setSelectedContent(contentDefault);
  };

  const columns = [
    { title: "Name", render: (item: GetContentRes) => item.name },
    { title: "Categoria", render: (item: GetContentRes) => item.theme.name },
    { title: "Tema", render: (item: GetContentRes) => item.category.name },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Content Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateNew}
        sx={{ mt: 2 }}
      >
        Add New Content
      </Button>
      <SearchBar onSearch={handleSearch} />
      <DataTable
        data={contents}
        columns={columns}
        onSelectRow={handleSelectRow}
      />
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedContent ? "Edit Content" : "Create Content"}
      >
        <ContentForm
          defaultValues={selectedContent}
          onSubmit={handleSubmit}
          themes={themes}
          categories={categories}
        />
      </CustomModal>
    </Box>
  );
};

export default ContentAdmin;
