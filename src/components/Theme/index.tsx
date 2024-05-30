import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const ThemeAdmin: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Theme Management
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Add New Theme
      </Button>
    </Box>
  );
};

export default ThemeAdmin;
