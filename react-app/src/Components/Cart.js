import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, IconButton, TextField, Grid } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Cart = ({ initialCartItems }) => {
    const [cartItems, setCartItems] = useState(initialCartItems || []);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        calculateTotal(cartItems);
    }, [cartItems]);

    const calculateTotal = (items) => {
        const newTotal = items.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0);
        setTotal(newTotal);
    };

    const handleQuantityChange = (item, quantity) => {
        if (quantity < 1) return;

        const updatedItems = cartItems.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, qty: quantity } : cartItem
        );
        setCartItems(updatedItems);
    };

    const handleRemoveFromCart = (itemId) => {
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedItems);
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { total } });
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>Shopping Cart</Typography>
                {cartItems.length === 0 ? (
                    <Typography variant="body1">Your cart is empty</Typography>
                ) : (
                    <Box>
                        <Grid container spacing={2}>
                            {cartItems.map(item => (
                                <Grid item xs={12} key={item.id}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box>
                                            <Typography variant="h6">{item.title}</Typography>
                                            <Typography variant="body2">${item.price}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <IconButton onClick={() => handleQuantityChange(item, item.qty - 1)}>
                                                <Remove />
                                            </IconButton>
                                            <TextField
                                                type="number"
                                                value={item.qty}
                                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                                inputProps={{ min: 1 }}
                                                style={{ width: 50, marginRight: 8 }}
                                            />
                                            <IconButton onClick={() => handleQuantityChange(item, item.qty + 1)}>
                                                <Add />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="body2">Price: ${item.price * item.qty}</Typography>
                                        <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                            Total: ${total.toFixed(2)}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleClearCart}>Clear Cart</Button>
                        <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ ml: 2 }}>Checkout</Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Cart;