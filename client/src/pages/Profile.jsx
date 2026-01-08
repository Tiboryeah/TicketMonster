import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Ticket, Calendar, MapPin, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchMyTickets = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tickets/my-tickets');
                setTickets(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (user) fetchMyTickets();
    }, [user]);

    return (
        <div style={{ padding: '0 40px', maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '60px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '800' }}>Mi <span className="gradient-text">Perfil</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Bienvenido, {user?.name}. Aquí están tus boletos adquiridos.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' }}>
                {tickets.length === 0 ? (
                    <div className="glass-morphism" style={{ gridColumn: '1 / -1', padding: '100px', textAlign: 'center' }}>
                        <Ticket size={64} color="var(--text-muted)" style={{ marginBottom: '20px' }} />
                        <h3>Aún no tienes boletos</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Explora los próximos eventos para empezar.</p>
                    </div>
                ) : (
                    tickets.map((ticket) => {
                        if (!ticket.eventId) return null; // Saltar tickets huérfanos
                        return (
                            <motion.div
                                key={ticket._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-morphism"
                                style={{ display: 'flex', overflow: 'hidden' }}
                            >
                                <div style={{ width: '120px', background: `url(http://localhost:5000${ticket.eventId.image}) center/cover` }}></div>
                                <div style={{ padding: '25px', flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{ticket.eventId.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '5px' }}>
                                                <Calendar size={14} /> {new Date(ticket.eventId.date).toLocaleDateString()}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
                                                <MapPin size={14} /> {ticket.eventId.location}
                                            </div>
                                        </div>
                                        <div className="gradient-bg" style={{ padding: '5px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold' }}>
                                            {ticket.ticketType}
                                        </div>
                                    </div>

                                    <div style={{ borderTop: '1px dashed var(--glass-border)', marginTop: '20px', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cantidad: {ticket.quantity}</p>
                                            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>PAGO: ${ticket.totalPrice}</p>
                                        </div>
                                        <button className="glass-morphism" style={{ padding: '10px', color: 'var(--accent)' }}>
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Profile;
