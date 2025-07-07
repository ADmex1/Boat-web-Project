import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            if (response.data.status === 'success') {
                setUser(response.data.user);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setError(null);
                return true;
            }
            return false;
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
            return false;
        }
    };

    const register = async (userData) => {
        try {
            console.log('Registering user:', userData);
            const response = await authAPI.register({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                password_confirmation: userData.password_confirmation
            });
            
            if (response.data.status === 'success') {
                setError(null);
                return true;
            } else {
                setError(response.data.message);
                return false;
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        error,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 