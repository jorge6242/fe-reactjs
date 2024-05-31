import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import DataTable from '../DataTable';
import CustomModal from '../Modal';
import UserForm, { IUserForm } from '../UserForm';
import { User, getUserList, createUser, updateUser } from '../../services/user.service';
import { GetRolesRes, getRoles } from '../../services/role.service';
import useSnackbarStore from '../../store/useSnackbarStore';
import SearchBar from '../SearchBar';

const UserDashboard = () => {
  const [ roles, setRoles ] = useState<GetRolesRes[]>([])
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUserForm | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const setMessage = useSnackbarStore((state) => state.setMessage);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUserList();
      setUsers(userList);
      const response = await getRoles();
      setRoles(response as GetRolesRes[])
    };

    fetchUsers();
  }, []);

  const handleSelectRow = (user: IUserForm) => {
    console.log('user ', user);
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedUser({ id: '', alias: '', email: '', roles: [], role : '' });
    setModalOpen(true);
  };

  const handleSubmit = async (userData: IUserForm) => {
    let res = null;
    if (selectedUser && selectedUser.id) {
      res = await updateUser(selectedUser.id, { ...userData, roles: [userData.role] });
    } else {
      res = await createUser({ ...userData, roles: [userData.role] });
    }

    if (res?.response?.data.message === "Access denied.") {
      setMessage("No tiene permisos para esta operación", "error");
    } else {
      setMessage(
        `Registro ${
          selectedUser && selectedUser.id ? "Actualizado" : "Creado"
        }`,
        "success"
      );
    }

    const updatedUsers = await getUserList();
    setUsers(updatedUsers);
    setModalOpen(false);
    setSelectedUser(null); 
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      const userList = await getUserList(searchTerm);
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Failed to fetch users', 'error');
    }
  };

  const columns = [
    {
      title: 'Alias',
      render: (user: User) => user.alias
    },
    {
      title: 'Email',
      render: (user: User) => user.email
    },
    {
      title: 'Role',
      render: (user: User) => {
        if(user.roles?.length && roles.length){
          const findRole = roles.find(e => user.roles.includes(e.id as string) );
          if(findRole) {
            return findRole.name
          }
          return ''
        }
        return ''
      }
    }
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>User</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box flexGrow={1}>
          <Button variant="contained" color="primary" onClick={handleCreateNew}>
            Create New User
          </Button>
        </Box>
        <Box width="50%">  {/* Ajusta el ancho aquí */}
          <SearchBar onSearch={handleSearch} />
        </Box>
      </Box>
      <DataTable data={users} columns={columns} onSelectRow={handleSelectRow} />
      <CustomModal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedUser?.id ? "Edit User" : "Create User"}>
        {selectedUser && <UserForm defaultValues={selectedUser} onSubmit={handleSubmit} roles={roles} />}
      </CustomModal>
    </Box>
  );
};

export default UserDashboard;
