import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Snackbar, Alert } from "@mui/material";
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

const contentDefault: GetContentRes = {
  _id: "",
  name: "",
  theme: {
    _id: "",
    name: "",
  },
  category: {
    _id: "",
    name: "",
    description: "",
  }
};

const ContentAdmin: React.FC = () => {
  const [contents, setContents] = useState<GetContentRes[]>([]);
  const [themes, setThemes] = useState<GetThemeRes[]>([]);
  const [categories, setCategories] = useState<GetCategoryRes[]>([]);
  const [selectedContent, setSelectedContent] = useState<GetContentRes>(contentDefault);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const localUser = localStorage.getItem("user");

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

  const handleSubmit = async (contentData: IContentFormData) => {
    const currentUser = JSON.parse(localUser as string);
    let res = null;
    if (selectedContent && selectedContent._id) {
      res = await updateContent(selectedContent._id, {
        ...contentData,
        userId: currentUser ? currentUser.id : "",
      });
    } else {
      res = await createContent({ ...contentData, userId: currentUser ? currentUser.id : "" });
    }
    setSnackbarOpen(true);
    if(res?.response?.data.message === 'Access denied.'){
      setIsError(true)
      setMessage("No tiene permisos para esta operación");
      
    } else {
      setIsError(false)
      setMessage(`Registro ${selectedContent && selectedContent._id ? "Actualizado": "Creado"}`);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? "error": "success"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContentAdmin;
