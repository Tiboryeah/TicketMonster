import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const token = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');
                if (token && storedUser && storedUser !== "undefined") {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.clear(); // Limpiar si hay basura
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        if (res.data.token && res.data.user) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            return res.data.user;
        } else {
            throw new Error('Respuesta del servidor incompleta');
        }
    };

    const register = async (name, email, password, role = 'client', phone, countryCode) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role, phone, countryCode });
        if (res.data.token && res.data.user) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            return res.data.user;
        } else {
            throw new Error('Hubo un error en el registro');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
