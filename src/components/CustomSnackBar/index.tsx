import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import useSnackbarStore from '../../store/useSnackbarStore';

const CustomSnackbar: React.FC = () => {
  const { open, message, severity, resetSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={resetSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
      sx={{
        bottom: '50%',
        transform: 'translateY(-50%)'
      }}
    >
      <Alert variant='filled' onClose={resetSnackbar} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
