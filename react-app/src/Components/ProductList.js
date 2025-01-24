import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const handleViewProduct = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (product) => {
        onAddToCart(product);
    };

    return (
        <Container>
            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="250"
                                image={product.imageUrl}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    R{product.price}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={() => handleViewProduct(product.id)}>View</Button>
                                <Button variant="contained" color="secondary" onClick={() => handleAddToCart(product)} sx={{ ml: 2 }}>Add to Cart</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
