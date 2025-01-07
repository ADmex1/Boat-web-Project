import axios from 'axios';
//this file is used to create the api calls to the backend
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
//this is used to add the token to the header of the request
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//this is used to log the response error
api.interceptors.response.use(
    response => response,
    error => {
        console.error('Response error:', error.response?.data);
        return Promise.reject(error);
    }
);
//this is used to create the api calls
export const authAPI = {
    login: async (credentials) => {
        try {
            console.log('Sending login request:', credentials);
            const response = await api.post('/login', credentials);
            console.log('Login response:', response.data);
            return response;
        } catch (error) {
            console.error('Login API error:', error.response?.data);
            throw error;
        }
    },
    register: (userData) => api.post('/register', userData)
};
//this is used to create the api calls
export const boatAPI = {
    getAll: () => api.get('/boats'),
    getOne: (id) => api.get(`/boats/${id}`),
};
//this is used to create the api calls
export const reviewAPI = {
    getAll: () => api.get('/reviews'),
    create: (data) => api.post('/reviews', data),
    update: (id, data) => api.put(`/reviews/${id}`, data),
    delete: (id) => api.delete(`/reviews/${id}`)
};
//this is used to create the api calls
const reviewEndpoints = {
    login: (data) => api.post('/login', data),
    register: (data) => api.post('/register', data),
    logout: () => api.post('/logout'),
    getBoats: () => api.get('/boats'),
    getReviews: (boatId) => api.get(`/boats/${boatId}/reviews`),
    createReview: (boatId, data) => api.post(`/boats/${boatId}/reviews`, data),
    updateReview: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),
    deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`)
};
//this is used to export the api calls
export default {
    ...reviewEndpoints,
    ...authAPI,
    ...boatAPI
}; 