import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';

interface LoginForm {
  email: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data.email);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: 360, margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
        <TextField
          label="Email"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          fullWidth
        />
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
