import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './style.css'; // Make sure to import your CSS file

const Navbar = ({ isAuthenticated, onLogout }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = (
        <List>
            <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/wishlist" onClick={toggleDrawer(false)}>
                <ListItemText primary="Wishlist" />
            </ListItem>
            <ListItem button component={Link} to="/cart" onClick={toggleDrawer(false)}>
                <ListItemText primary="Cart" />
            </ListItem>
            {isAuthenticated ? (
                <ListItem button onClick={() => { onLogout(); toggleDrawer(false)(); }}>
                    <ListItemText primary="Logout" />
                </ListItem>
            ) : (
                <>
                    <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button component={Link} to="/register" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Register" />
                    </ListItem>
                </>
            )}
        </List>
    );

    return (
        <AppBar position="static" className="sticky-navbar">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleDrawer(true)}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Blendify
                </Typography>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    {drawerList}
                </Drawer>
                <Button color="inherit" component={Link} to="/" sx={{ display: { xs: 'none', sm: 'block' } }}>Home</Button>
                <Button color="inherit" component={Link} to="/wishlist" sx={{ display: { xs: 'none', sm: 'block' } }}>Wishlist</Button>
                <Button color="inherit" component={Link} to="/cart" sx={{ display: { xs: 'none', sm: 'block' } }}>Cart</Button>
                {isAuthenticated ? (
                    <Button color="inherit" onClick={onLogout} sx={{ display: { xs: 'none', sm: 'block' } }}>Logout</Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login" sx={{ display: { xs: 'none', sm: 'block' } }}>Login</Button>
                        <Button color="inherit" component={Link} to="/register" sx={{ display: { xs: 'none', sm: 'block' } }}>Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;