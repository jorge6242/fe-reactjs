import { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import DataTable from "../DataTable";
import CustomModal from "../Modal";
import {
  GetThemeRes,
  createTheme,
  getThemeList,
  updateTheme,
} from "../../services/theme.sevice";
import ThemeForm, { IThemeForm } from "../ThemeForm";
import useSnackbarStore from "../../store/useSnackbarStore";
import SearchBar from "../SearchBar";

const ThemeAdmin = () => {
  const [themes, setThemes] = useState<GetThemeRes[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<IThemeForm>({
    id: "",
    name: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const setMessage = useSnackbarStore((state) => state.setMessage);

  useEffect(() => {
    const fetchThemes = async () => {
      const themeList = await getThemeList();
      setThemes(themeList);
    };

    fetchThemes();
  }, []);

  const handleSelectRow = (user: GetThemeRes) => {
    setSelectedTheme(user);
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedTheme({ id: "", name: "" });
    setModalOpen(true);
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      const themeList = await getThemeList(searchTerm);
      setThemes(themeList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to fetch users", "error");
    }
  };

  const handleSubmit = async (userData: IThemeForm) => {
    let res = null;
    if (selectedTheme && selectedTheme.id) {
      res = await updateTheme(selectedTheme.id, userData);
    } else {
      res = await createTheme(userData);
    }

    if (res?.response?.data.message === "Access denied.") {
      setMessage("No tiene permisos para esta operación", "error");
    } else {
      setMessage(
        `Registro ${
          selectedTheme && selectedTheme.id ? "Actualizado" : "Creado"
        }`,
        "success"
      );
    }

    const updatedUsers = await getThemeList();
    setThemes(updatedUsers);
    setModalOpen(false);
    setSelectedTheme({ id: "", name: "" });
  };

  const columns = [
    {
      title: "Name",
      render: (user: GetThemeRes) => user.name,
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Theme Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateNew}
        sx={{ mb: 2 }}
      >
        Create New Theme
      </Button>
      <SearchBar onSearch={handleSearch} />
      <DataTable
        data={themes}
        columns={columns}
        onSelectRow={handleSelectRow}
      />
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedTheme?.id ? "Edit User" : "Create User"}
      >
        <ThemeForm defaultValues={selectedTheme} onSubmit={handleSubmit} />
      </CustomModal>
    </Box>
  );
};

export default ThemeAdmin;
