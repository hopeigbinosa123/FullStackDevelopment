import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = ({ initialCartItems }) => {
    const [cartItems, setCartItems] = useState(initialCartItems || []);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

    const calculateTotal = () => {
        const newTotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0);
        setTotal(newTotal);
    };

    const handleAddToCart = (product) => {
        const existItem = cartItems.find(x => x.id === product.id);

        if (existItem) {
            const updatedCartItems = cartItems.map(x => x.id === existItem.id ? { ...x, qty: x.qty + 1 } : x);
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(x => x.id !== productId);
        setCartItems(updatedCartItems);
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
                        {cartItems.map(item => (
                            <Box key={item.id} sx={{ mb: 2 }}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body2">${item.price}</Typography>
                                <Typography variant="body2">Quantity: {item.qty}</Typography>
                                <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                            </Box>
                        ))}
                        <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                            Total: R{total.toFixed(2)}
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