import React, { useState } from 'react';
import { Container, Typography, TextField, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PayPalButtonComponent from './PayPalButton'; // Import PayPal button component

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Add a fallback value for total if location.state is null
    const total = location.state?.total || 0;

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePaymentSuccess = (details) => {
        setPaymentCompleted(true);
        // Save the order details to the backend if needed
        navigate('/order-success');
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>Checkout</Typography>
                <TextField
                    fullWidth
                    label="Shipping Address"
                    value={address}
                    onChange={handleAddressChange}
                    margin="normal"
                    required
                />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    Total: R{total.toFixed(2)}
                </Typography>
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>Payment</Typography>
                <PayPalButtonComponent amount={total.toFixed(2)} currency="ZAR" onSuccess={handlePaymentSuccess} />
                {paymentCompleted && <Typography variant="body2" color="success" sx={{ mt: 2 }}>Payment successful! Your order is on the way.</Typography>}
            </Box>
        </Container>
    );
};

export default Checkout;