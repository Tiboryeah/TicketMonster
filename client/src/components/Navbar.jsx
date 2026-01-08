import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, LayoutDashboard, Ticket } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass-morphism" style={{
            position: 'sticky', top: '20px', zIndex: 1000,
            margin: '0 20px', padding: '15px 30px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '40px'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                <img src="/icon.png" alt="TicketMonster Token" style={{ height: '45px', width: 'auto', filter: 'invert(1)' }} />
                <span className="gradient-text" style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>TicketMonster</span>
            </Link>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <Link to="/events" className="hover-link">Explorar</Link>

                <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'var(--text-main)' }}>
                    <ShoppingCart size={24} />
                    {cartItems.length > 0 && (
                        <span style={{
                            position: 'absolute', top: '-8px', right: '-8px',
                            background: 'var(--secondary)', color: 'white',
                            fontSize: '10px', width: '18px', height: '18px',
                            borderRadius: '50%', display: 'flex',
                            justifyContent: 'center', alignItems: 'center', fontWeight: 'bold'
                        }}>
                            {cartItems.length}
                        </span>
                    )}
                </Link>

                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <Link to="/admin/dashboard" className="hover-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>
                        )}
                        <Link to="/profile" className="hover-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Ticket size={20} /> Mis Boletos
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
                            <span style={{ fontWeight: '600', color: 'var(--accent)' }}>{user.name}</span>
                            <button onClick={handleLogout} className="glass-morphism" style={{ padding: '8px 15px', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <LogOut size={18} /> Salir
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link to="/login" className="glass-morphism" style={{ padding: '10px 20px' }}>Iniciar Sesión</Link>
                        <Link to="/register" className="gradient-bg" style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold' }}>Registrarse</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
