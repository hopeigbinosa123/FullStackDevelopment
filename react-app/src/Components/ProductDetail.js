import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardMedia, Box, Grid } from '@mui/material';
import axios from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import AddToWishlist from './AddToWishlist';
import ReviewForm from './ReviewForm';
import Rating from '@mui/material/Rating';

const ProductDetail = ({ onAddToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });

        fetchReviews();
    }, [id]);

    const fetchReviews = () => {
        axios.get(`/reviews/?product=${id}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    };

    const handleAddToCart = () => {
        onAddToCart(product);
        navigate('/cart');
        alert('Product added to cart!');
    };

    if (!product) {
        return <div>Loading...</div>;
    }

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
                    <AddToWishlist productId={product.id} />
                    <ReviewForm productId={product.id} onReviewSubmit={fetchReviews} />
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5">Reviews</Typography>
                        {reviews.length > 0 ? (
                            <Grid container spacing={2}>
                                {reviews.map(review => (
                                    <Grid item xs={12} key={review.id}>
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Box>
                                                <Rating value={review.rating} readOnly />
                                                <Typography variant="body2">{review.comment}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    By {review.user.username} on {new Date(review.created_at).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body1">No reviews yet. Be the first to leave a review!</Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetail;