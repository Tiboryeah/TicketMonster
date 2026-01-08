import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [event, setEvent] = useState(null);
    // State to hold quantity for each ticket type: { "General": 0, "VIP": 2 }
    const [ticketQuantities, setTicketQuantities] = useState({});
    const [added, setAdded] = useState(false);

    // Initialize quantities with 0
    useEffect(() => {
        if (event && event.tickets) {
            const initialQ = {};
            event.tickets.forEach(t => initialQ[t.name] = 0);
            setTicketQuantities(initialQ);
        }
    }, [event]);

    const updateQuantity = (ticketName, delta, stock) => {
        setTicketQuantities(prev => {
            const current = prev[ticketName] || 0;
            const newVal = Math.max(0, Math.min(stock, current + delta));
            return { ...prev, [ticketName]: newVal };
        });
    };

    const totalToPay = event ? event.tickets.reduce((acc, t) => acc + (t.price * (ticketQuantities[t.name] || 0)), 0) : 0;
    const totalItems = Object.values(ticketQuantities).reduce((a, b) => a + b, 0);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(res.data);
                if (res.data.tickets.length > 0) setSelectedTicket(res.data.tickets[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEvent();
    }, [id]);

    const handleAddToCart = () => {
        if (totalItems === 0) return;

        // Add each selected ticket type to cart
        event.tickets.forEach(t => {
            const qty = ticketQuantities[t.name];
            if (qty > 0) {
                addToCart(event, t, qty);
            }
        });

        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            // Reset quantities after adding??? Maybe better to keep them or reset. Let's reset for clarity.
            const resetQ = {};
            event.tickets.forEach(t => resetQ[t.name] = 0);
            setTicketQuantities(resetQ);
        }, 1500);
    };

    if (!event) return <div style={{ padding: '100px', textAlign: 'center' }}>Cargando...</div>;

    return (
        <div style={{ padding: '0 40px', maxWidth: '1200px', margin: '0 auto' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px' }}>
                <ArrowLeft size={20} /> Volver
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
                {/* Left: Info */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ height: '500px', borderRadius: '24px', overflow: 'hidden', marginBottom: '40px' }}>
                        <img src={event.image ? `http://localhost:5000${event.image}` : 'https://via.placeholder.com/800x500'} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px' }}>{event.title}</h1>
                    <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
                        <div className="glass-morphism" style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Calendar color="var(--primary)" />
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fecha</p>
                                <p style={{ fontWeight: 'bold' }}>{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="glass-morphism" style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <MapPin color="var(--primary)" />
                            <div>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ubicación</p>
                                <p style={{ fontWeight: 'bold' }}>{event.location}</p>
                            </div>
                        </div>
                    </div>
                    <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Acerca del evento</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '18px', marginBottom: '40px' }}>{event.description}</p>

                    <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Ubicación</h3>
                    <div className="glass-morphism" style={{ height: '350px', width: '100%', overflow: 'hidden', borderRadius: '24px' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            title="Mapa del evento"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(90%)' }}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        ></iframe>
                    </div>
                </motion.div>

                {/* Right: Tickets Selection */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass-morphism" style={{ padding: '40px', position: 'sticky', top: '100px' }}>
                        <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>Selecciona tus <span className="gradient-text">Boletos</span></h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                            {event.tickets.map((t) => (
                                <div
                                    key={t.name}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '16px',
                                        border: '1px solid var(--glass-border)',
                                        background: (ticketQuantities[t.name] > 0) ? 'rgba(131, 58, 180, 0.1)' : 'rgba(255,255,255,0.02)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        transition: '0.3s'
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '18px', display: 'flex', justifyContent: 'space-between', marginRight: '15px' }}>
                                            {t.name}
                                            <span style={{ fontWeight: '800', color: 'var(--primary)' }}>${t.price}</span>
                                        </h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{t.stock} disponibles</p>
                                    </div>

                                    {/* Quantity Control inside the card */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '5px', borderRadius: '12px' }}>
                                        <button
                                            onClick={() => updateQuantity(t.name, -1, t.stock)}
                                            className="glass-morphism"
                                            style={{ width: '30px', height: '30px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        > - </button>
                                        <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{ticketQuantities[t.name] || 0}</span>
                                        <button
                                            onClick={() => updateQuantity(t.name, 1, t.stock)}
                                            className="glass-morphism"
                                            style={{ width: '30px', height: '30px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        > + </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Total a pagar</span>
                            <span style={{ fontSize: '32px', fontWeight: '800' }}>${totalToPay}</span>
                        </div>

                        {user ? (
                            <button
                                onClick={handleAddToCart}
                                disabled={added || totalItems === 0}
                                className="gradient-bg"
                                style={{ width: '100%', padding: '18px', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', opacity: totalItems === 0 ? 0.5 : 1 }}
                            >
                                {added ? '¡Añadido al Carrito!' : 'Añadir al Carrito'}
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="glass-morphism"
                                style={{ width: '100%', padding: '18px', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)', border: '1px solid var(--primary)' }}
                            >
                                Iniciar Sesión para Comprar
                            </button>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '20px', color: 'var(--accent)', fontSize: '14px' }}>
                            <ShieldCheck size={18} /> Pago Protegido & Seguro
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EventDetail;
