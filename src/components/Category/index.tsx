import { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import DataTable from "../DataTable";
import CustomModal from "../Modal";
import {
  GetCategoryRes,
  createCategory,
  getCategoryList,
  updateCategory,
} from "../../services/category.service";
import CategoryForm, { ICategoryForm } from "../CategoryForm";
import useSnackbarStore from "../../store/useSnackbarStore";

const CategoryAdmin = () => {
  const [category, setCategories] = useState<GetCategoryRes[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategoryForm>({
    id: "",
    name: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const setMessage = useSnackbarStore((state) => state.setMessage);

  useEffect(() => {
    const fetchThemes = async () => {
      const categoryList = await getCategoryList();
      setCategories(categoryList);
    };

    fetchThemes();
  }, []);

  const handleSelectRow = (user: GetCategoryRes) => {
    console.log("user ", user);
    setSelectedCategory(user);
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedCategory({ id: "", name: "" });
    setModalOpen(true);
  };

  const handleSubmit = async (userData: ICategoryForm) => {
    let res = null;
    if (selectedCategory && selectedCategory.id) {
      res = await updateCategory(selectedCategory.id, userData);
    } else {
      res = await createCategory(userData);
    }

    if (res?.response?.data.message === "Access denied.") {
      setMessage("No tiene permisos para esta operación", "error");
    } else {
      setMessage(
        `Registro ${
          selectedCategory && selectedCategory.id ? "Actualizado" : "Creado"
        }`,
        "success"
      );
    }

    const updatedUsers = await getCategoryList();
    setCategories(updatedUsers);
    setModalOpen(false);
    setSelectedCategory({ id: "", name: "" });
  };

  const columns = [
    {
      title: "Name",
      render: (user: GetCategoryRes) => user.name,
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Category Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateNew}
        sx={{ mb: 2 }}
      >
        Create New Category
      </Button>
      <DataTable
        data={category}
        columns={columns}
        onSelectRow={handleSelectRow}
      />
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedCategory?.id ? "Edit User" : "Create User"}
      >
        <CategoryForm
          defaultValues={selectedCategory}
          onSubmit={handleSubmit}
        />
      </CustomModal>
    </Box>
  );
};

export default CategoryAdmin;
