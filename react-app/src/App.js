import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';
import Cart from './Components/Cart';
import Register from './Components/Register';
import Login from './Components/Login';
import Checkout from './Components/Checkout';
import Wishlist from './Components/Wishlist';
import './App.css';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        setIsAuthenticated(!!accessToken);
    }, []);

    const handleAddToCart = (product) => {
        const existItem = cartItems.find((item) => item.id === product.id);

        if (existItem) {
            const updatedCartItems = cartItems.map((item) =>
                item.id === existItem.id ? { ...item, qty: item.qty + 1 } : item
            );
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
                    <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
                    <Route path="/cart" element={<Cart initialCartItems={cartItems} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} />
                    <Route path="/wishlist" element={<Wishlist />} />  {/* Add this line for the Wishlist route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;