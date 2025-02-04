import React from 'react';
import { Button } from '@mui/material';
import API from '../api';

const AddToWishlist = ({ productId }) => {
    const handleAddToWishlist = async () => {
        try {
            await API.post(`/wishlist/`, { product: productId });
            alert('Product added to wishlist!');
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            if (error.response.status === 401) {
                alert('You need to be logged in to add items to your wishlist.');
            }
        }
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleAddToWishlist}>
            Add to Wishlist
        </Button>
    );
};

export default AddToWishlist;
