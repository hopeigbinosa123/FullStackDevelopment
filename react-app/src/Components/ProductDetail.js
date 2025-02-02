import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import axios from '../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({ onAddToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the product!', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        onAddToCart(product);
        navigate('/cart');
    };

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    height="500"
                    image={product.image_url}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        {product.description}
                    </Typography>
                    <Typography variant="h5" component="div">
                        ${product.price}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetail;
