import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('access');
    console.log('Retrieved token:', token); // Debug log
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
        console.log('Added token to headers:', req.headers.Authorization); // Debug log
    }
    return req;
});

export default API;
