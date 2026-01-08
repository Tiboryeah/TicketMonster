import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'client' });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.email, formData.password, formData.role);
            navigate('/');
        } catch (err) {
            setError('Error al registrar. El correo ya podría estar en uso.');
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
                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Unete a <span className="gradient-text">TicketMonster</span></h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Crea tu cuenta y empieza a vivir experiencias</p>

                {error && <p style={{ color: '#ff4d4d', marginBottom: '20px' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label>Nombre Completo</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label>Correo Electrónico</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label>Contraseña</label>
                        <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label>Tipo de Usuario</label>
                        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                            <option value="client" style={{ background: '#1a1a24' }}>Cliente</option>
                            <option value="admin" style={{ background: '#1a1a24' }}>Administrador</option>
                        </select>
                    </div>
                    <button type="submit" className="gradient-bg" style={{ padding: '15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
                        Crear Cuenta
                    </button>
                </form>

                <p style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Inicia Sesión</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
