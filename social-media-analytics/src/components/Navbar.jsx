import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" className={styles.title}>
          Social Media Analytics
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/" 
            className={location.pathname === '/' ? styles.activeLink : ''}
          >
            Feed
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/top-users" 
            className={location.pathname === '/top-users' ? styles.activeLink : ''}
          >
            Top Users
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/trending-posts" 
            className={location.pathname === '/trending-posts' ? styles.activeLink : ''}
          >
            Trending Posts
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
