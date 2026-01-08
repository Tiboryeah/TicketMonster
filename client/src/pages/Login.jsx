import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Credenciales inválidas. Intenta de nuevo.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-morphism"
                style={{ padding: '40px', width: '100%', maxWidth: '450px' }}
            >
                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Bienvenido de <span className="gradient-text">Nuevo</span></h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Inicia sesión para gestionar tus boletos</p>

                {error && <p style={{ color: '#ff4d4d', marginBottom: '20px' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label>Correo Electrónico</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label>Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="gradient-bg" style={{ padding: '15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
                        Iniciar Sesión
                    </button>
                </form>

                <p style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    ¿No tienes cuenta? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Regístrate</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
