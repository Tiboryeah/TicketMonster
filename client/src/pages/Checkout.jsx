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
        expMonth: '',
        expYear: '',
        cvv: ''
    });
    const [cardBrand, setCardBrand] = useState('');

    const detectCardBrand = (number) => {
        const clean = number.replace(/\s/g, '');
        if (/^4/.test(clean)) return 'Visa';
        if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'MasterCard';
        if (/^3[47]/.test(clean)) return 'Amex';
        if (/^6(?:011|5)/.test(clean)) return 'Discover';
        return '';
    };

    const handleCardNumberChange = (e) => {
        const val = e.target.value.replace(/\D/g, ''); // Solo números
        setForm({ ...form, cardNumber: val });
        setCardBrand(detectCardBrand(val));
    };

    const handlePurchase = async (e) => {
        e.preventDefault();

        // Validaciones
        const cleanCard = form.cardNumber.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cleanCard)) {
            alert('El número de tarjeta debe tener exactamente 16 dígitos.');
            return;
        }

        if (!/^\d{3}$/.test(form.cvv)) {
            alert('El CVV debe tener exactamente 3 dígitos.');
            return;
        }

        if (!form.expMonth || !form.expYear) {
            alert('Por favor selecciona la fecha de expiración completa.');
            return;
        }

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
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label>Número de Tarjeta</label>
                                {cardBrand && (
                                    <span style={{ fontWeight: 'bold', color: 'var(--accent)', fontSize: '12px' }}>
                                        {cardBrand}
                                    </span>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                maxLength="16"
                                value={form.cardNumber}
                                onChange={handleCardNumberChange}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>Expira</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <select
                                        value={form.expMonth}
                                        onChange={(e) => setForm({ ...form, expMonth: e.target.value })}
                                        required
                                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                                    >
                                        <option value="" disabled>Mes</option>
                                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                                            <option key={m} value={m} style={{ color: 'black' }}>{m}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={form.expYear}
                                        onChange={(e) => setForm({ ...form, expYear: e.target.value })}
                                        required
                                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                                    >
                                        <option value="" disabled>Año</option>
                                        {Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i).slice(-2)).map(y => (
                                            <option key={y} value={y} style={{ color: 'black' }}>20{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>CVV</label>
                                <input
                                    type="password"
                                    placeholder="123"
                                    maxLength="3"
                                    value={form.cvv}
                                    onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '') })} // Solo números
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
