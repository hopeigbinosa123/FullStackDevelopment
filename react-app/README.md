### Frontend Documentation

## Project Overview

This is the frontend part of an ecommerce web application built using React. The application allows users to browse products, add them to their cart, submit reviews, and manage their wishlist.

## Installation and Setup

### Prerequisites
Make sure you have Node.js and npm (Node Package Manager) installed on your machine.

### Steps to Setup

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/your-repo/ecommerce-frontend.git
   cd ecommerce-frontend
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Start the React Development Server**:
   ```sh
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
react-app/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── Components/
│   │   ├── Navbar.js
│   │   ├── ProductList.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   ├── ReviewForm.js
│   │   └── ...
│   ├── App.js
│   ├── api.js
│   ├── index.js
│   └── ...
│
└── package.json
```

## Features

### Navbar
The Navbar component provides navigation links to different pages, including Home, Wishlist, Cart, Login, and Register. It also includes a responsive hamburger menu for mobile views.

### Product List
The ProductList component displays a list of products fetched from the backend API. Users can browse through the products and select one to view its details.

### Product Detail
The ProductDetail component displays detailed information about a specific product, allows users to add the product to their cart, and submit reviews. It also includes the AddToWishlist component for adding products to the wishlist.

### Cart
The Cart component displays the products added to the user's cart, allows users to manage quantities, and proceed to checkout.

### Wishlist
The Wishlist component displays the products added to the user's wishlist. Users can view and manage their wishlist items.

### Review Form
The ReviewForm component allows users to submit reviews and ratings for products.

## API Integration

### api.js
The `api.js` file sets up an Axios instance for making API requests to the backend. It includes an interceptor to add the authentication token to the request headers.

**api.js**:
```javascript
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('access');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
```

## Usage

### How to Add Products to Cart
1. Navigate to a product detail page.
2. Click the "Add to Cart" button.
3. The product will be added to your cart.

### How to Add Products to Wishlist
1. Navigate to a product detail page.
2. Click the "Add to Wishlist" button.
3. The product will be added to your wishlist. Ensure you are logged in.

### How to Submit Reviews
1. Navigate to a product detail page.
2. Fill out the review form with a rating and comment.
3. Click the "Submit Review" button to submit your review. Ensure you are logged in.

## Components

### Navbar.js
The Navbar component with responsive design and links to various pages.

**Navbar.js**:
```javascript
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

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
        <AppBar position="static">
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
```
