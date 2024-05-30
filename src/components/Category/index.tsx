import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const CategoryAdmin: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Category Management
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Add New Category
      </Button>
    </Box>
  );
};

export default CategoryAdmin;
