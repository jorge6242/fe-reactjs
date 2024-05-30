import React from 'react';
import { Typography, Box, Drawer, List, ListItem, ListItemText, CssBaseline, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  const navigage = useNavigate()
  const close = () => {
    localStorage.clear();
    navigage("/")
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Users', 'Content', 'Themes', 'Categories'].map((text, index) => (
              <ListItem button key={text} component={Link} to={`/dashboard/${text.toLowerCase()}`}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
              <ListItem button key={"Cerrar sesión"} onClick={() => close()} >
                <ListItemText primary={"Cerrar sesión"} />
              </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
