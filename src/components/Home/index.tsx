import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Multimedia Content Management System
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Discover and manage a variety of content ranging from images to videos.
      </Typography>
      <Button variant="outlined" color="primary">
        Learn More
      </Button>
    </Box>
  );
};

export default Home;
