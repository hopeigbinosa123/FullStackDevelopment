import React, { useState } from 'react';
import { TextField, Button, Box, Rating, Typography, Alert } from '@mui/material';
import API from '../api';

const ReviewForm = ({ productId, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/reviews/', { product: productId, rating, comment });
            setSuccess(true);
            setRating(0);
            setComment('');
            onReviewSubmit(); // Trigger re-fetching of reviews
        } catch (error) {
            console.error('Error submitting review:', error);
            if (error.response && error.response.status === 400) {
                alert('Bad request. Please try again.');
            } else if (error.response && error.response.status === 401) {
                alert('You need to be logged in to submit a review.');
            }
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6">Leave a Review</Typography>
            {success && <Alert severity="success">Review submitted successfully!</Alert>}
            <Rating
                name="rating"
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                precision={1}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit">Submit Review</Button>
        </Box>
    );
};

export default ReviewForm;