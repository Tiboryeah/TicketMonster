import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'client',
        phone: '',
        countryCode: '+52' // Mexico por defecto
    });
    const [error, setError] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const countryCodes = [
        { code: '+52', iso: 'mx', name: 'México' },
        { code: '+1', iso: 'us', name: 'USA' },
        { code: '+1', iso: 'ca', name: 'Canadá' },
        { code: '+34', iso: 'es', name: 'España' },
        { code: '+54', iso: 'ar', name: 'Argentina' },
        { code: '+55', iso: 'br', name: 'Brasil' },
        { code: '+56', iso: 'cl', name: 'Chile' },
        { code: '+57', iso: 'co', name: 'Colombia' },
        { code: '+51', iso: 'pe', name: 'Perú' },
    ];

    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Solo números
        if (value.length <= 10) {
            setFormData({ ...formData, phone: value });
        }
    };

    const selectCountry = (country) => {
        setSelectedCountry(country);
        setFormData({ ...formData, countryCode: country.code });
        setIsDropdownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            setError('El número de teléfono debe tener exactamente 10 dígitos');
            return;
        }
        try {
            await register(
                formData.name,
                formData.email,
                formData.password,
                formData.role,
                formData.phone,
                formData.countryCode
            );
            navigate('/');
        } catch (err) {
            setError('Error al registrar. El correo ya podría estar en uso.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '20px 0' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-morphism"
                style={{ padding: '40px', width: '100%', maxWidth: '450px' }}
            >
                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Unete a <span className="gradient-text">TicketMonster</span></h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Crea tu cuenta y empieza a vivir experiencias</p>

                {error && <p style={{ color: '#ff4d4d', marginBottom: '20px', background: 'rgba(255, 77, 77, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '14px' }}>{error}</p>}

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
                        <label>Teléfono</label>
                        <div style={{ display: 'flex', gap: '10px', position: 'relative' }}>
                            {/* Custom Dropdown */}
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                style={{
                                    width: '100px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '5px'
                                }}
                            >
                                <img
                                    src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`}
                                    alt={selectedCountry.name}
                                    style={{ width: '20px', height: 'auto', borderRadius: '2px' }}
                                />
                                <span style={{ fontSize: '14px' }}>{selectedCountry.code}</span>
                                <span style={{ fontSize: '10px' }}>▼</span>
                            </div>

                            {isDropdownOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50px',
                                    left: 0,
                                    zIndex: 100,
                                    background: '#1a1a24',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    width: '180px',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                }}>
                                    {countryCodes.map((c) => (
                                        <div
                                            key={c.iso + c.name}
                                            onClick={() => selectCountry(c)}
                                            style={{
                                                padding: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                        >
                                            <img
                                                src={`https://flagcdn.com/w20/${c.iso}.png`}
                                                alt={c.name}
                                                style={{ width: '20px', borderRadius: '2px' }}
                                            />
                                            <span style={{ fontSize: '14px' }}>{c.code}</span>
                                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="10 dígitos"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                maxLength="10"
                                required
                                style={{ flex: 1 }}
                            />
                        </div>
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
