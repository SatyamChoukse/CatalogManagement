import conf from '@/conf/conf';
import axios from 'axios';

const api = axios.create({
    baseURL: conf.baseUrl,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(conf.token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
