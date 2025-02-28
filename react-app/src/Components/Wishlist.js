import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('/wishlist/');
                setWishlistItems(response.data);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                if (error.response.status === 401) {
                    alert('You need to be logged in to view your wishlist.');
                }
            }
        };
        fetchWishlist();
    }, []);

    const handleViewProduct = (productId) => {
        if (productId) {
            navigate(`/product/${productId}`);
        } else {
            console.error('Product ID is undefined.');
            alert('Error: Product ID is undefined.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Wishlist</Typography>
            {wishlistItems.length === 0 ? (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h6">Your wishlist is empty.</Typography>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {wishlistItems.map(item => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`${process.env.REACT_APP_API_URL}${item.product.image}`}  // Use correct image field and API URL
                                    alt={item.product.title}
                                />
                                <CardContent>
                                    <Typography variant="h5">{item.product.title}</Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewProduct(item.product.id)}
                                    >
                                        View Product
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Wishlist;