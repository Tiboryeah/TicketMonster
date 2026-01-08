import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <div style={{ padding: '0 40px', maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '800' }}>Tu <span className="gradient-text">Carrito</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Revisa tus boletos antes de finalizar la compra.</p>
            </header>

            {cartItems.length === 0 ? (
                <div className="glass-morphism" style={{ padding: '80px', textAlign: 'center' }}>
                    <ShoppingBag size={64} color="var(--text-muted)" style={{ marginBottom: '20px' }} />
                    <h3>Tu carrito está vacío</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Parece que aún no has elegido ningún evento.</p>
                    <Link to="/events" className="gradient-bg" style={{ padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold' }}>
                        Explorar Eventos
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={`${item.event._id}-${item.ticketType}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="glass-morphism"
                                    style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <img src={`http://localhost:5000${item.event.image}`} alt="" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                                        <div>
                                            <h4 style={{ fontSize: '18px' }}>{item.event.title}</h4>
                                            <p style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 'bold' }}>{item.ticketType}</p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{item.quantity} x ${item.price}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>${item.price * item.quantity}</span>
                                        <button
                                            onClick={() => removeFromCart(item.event._id, item.ticketType)}
                                            style={{ background: 'none', color: '#ff4d4d' }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <aside>
                        <div className="glass-morphism" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '20px' }}>Resumen</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                <span>${cartTotal}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Cargos por servicio</span>
                                <span>$0.00</span>
                            </div>
                            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Total</span>
                                <span style={{ fontWeight: '800', fontSize: '24px', color: 'var(--secondary)' }}>${cartTotal}</span>
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="gradient-bg"
                                style={{ width: '100%', padding: '15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                            >
                                Checkout <ArrowRight size={20} />
                            </button>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default Cart;
