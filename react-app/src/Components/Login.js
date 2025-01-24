import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login/', { username, password });
            const { access, refresh } = response.data;
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            onLogin();
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Login</Typography>
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
            <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" type="password" />
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
                Don't have an account? <Link href="/register">Register</Link>
            </Typography>
        </Container>
    );
};

export default Login;
