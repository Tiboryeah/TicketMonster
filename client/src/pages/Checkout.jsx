import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Lock } from 'lucide-react';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handlePurchase = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setLoading(true);
        try {
            // Process each item in cart as a purchase
            // In a real app, this would be a single order endpoint
            for (const item of cartItems) {
                await axios.post('http://localhost:5000/api/tickets/purchase', {
                    eventId: item.event._id,
                    ticketType: item.ticketType,
                    quantity: item.quantity,
                    totalPrice: item.price * item.quantity
                });
            }

            clearCart();
            navigate('/success');
        } catch (err) {
            alert(err.response?.data?.message || 'Error procesando el pago');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div style={{ textAlign: 'center', padding: '100px' }}>Inicia sesión para continuar</div>;

    return (
        <div style={{ padding: '0 40px', maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '800' }}>Pasarela de <span className="gradient-text">Pago</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Simulación de pago seguro. No ingreses datos reales.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <form onSubmit={handlePurchase} className="glass-morphism" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <CreditCard color="var(--primary)" />
                            <h3 style={{ fontSize: '20px' }}>Detalles de la Tarjeta</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Nombre en la Tarjeta</label>
                            <input
                                type="text"
                                placeholder="Juan Pérez"
                                value={form.cardName}
                                onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Número de Tarjeta</label>
                            <input
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                value={form.cardNumber}
                                onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>Expira (MM/YY)</label>
                                <input
                                    type="text"
                                    placeholder="12/28"
                                    value={form.expiry}
                                    onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>CVV</label>
                                <input
                                    type="password"
                                    placeholder="***"
                                    value={form.cvv}
                                    onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || cartItems.length === 0}
                            className="gradient-bg"
                            style={{ padding: '18px', borderRadius: '16px', fontWeight: 'bold', fontSize: '18px', marginTop: '20px' }}
                        >
                            {loading ? 'Procesando...' : `Pagar $${cartTotal}`}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Lock size={14} /> SSL Encrypted</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><ShieldCheck size={14} /> Secure Payment</div>
                        </div>
                    </form>
                </motion.div>

                <aside>
                    <div className="glass-morphism" style={{ padding: '30px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Tu Pedido</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {cartItems.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span>{item.quantity}x {item.event.title} ({item.ticketType})</span>
                                    <span style={{ fontWeight: 'bold' }}>${item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '10px', paddingTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total</span>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--accent)' }}>${cartTotal}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
