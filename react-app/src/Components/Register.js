import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('/register/', { username, email, password });
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Register</Typography>
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
            <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" type="password" />
            <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
                Already have an account? <Link href="/login">Login</Link>
            </Typography>
        </Container>
    );
};

export default Register;
