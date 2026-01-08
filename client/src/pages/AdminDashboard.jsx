import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, Ticket, DollarSign, Plus, Edit, Trash, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await axios.get('http://localhost:5000/api/tickets/stats');
                setStats(statsRes.data);
                const eventsRes = await axios.get('http://localhost:5000/api/events');
                setEvents(eventsRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este evento?')) {
            try {
                await axios.delete(`http://localhost:5000/api/events/${id}`);
                setEvents(events.filter(e => e._id !== id));
            } catch (err) {
                alert('Error al eliminar');
            }
        }
    };

    return (
        <div style={{ padding: '0 40px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                <div>
                    <h1 style={{ fontSize: '48px', fontWeight: '800' }}>Admin <span className="gradient-text">Dashboard</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Gestiona eventos, boletos y ventas desde aquí.</p>
                </div>
                <Link to="/admin/events/new" className="gradient-bg" style={{ padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Plus size={24} /> Nuevo Evento
                </Link>
            </header>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', marginBottom: '60px' }}>
                {[
                    { label: 'Boletos Vendidos', value: stats?.totalTickets || 0, icon: <Ticket color="#833ab4" />, trend: '+12% hoy' },
                    { label: 'Ingresos Totales', value: `$${stats?.totalRevenue?.toLocaleString() || 0}`, icon: <DollarSign color="#fcb045" />, trend: 'Actualizado' },
                    { label: 'Eventos Activos', value: events.length, icon: <Eye color="#fd1d1d" />, trend: 'En curso' },
                    { label: 'Compradores Únicos', value: stats?.uniqueBuyers || 0, icon: <Users color="#4facfe" />, trend: 'Nuevos' }
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass-morphism"
                        style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>{s.icon}</div>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: '20px' }}>{s.trend}</span>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '5px' }}>{s.label}</p>
                            <h3 style={{ fontSize: '32px', fontWeight: '800' }}>{s.value}</h3>
                        </div>
                        {/* Subtle background decoration */}
                        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.05, transform: 'rotate(-15deg)' }}>
                            {s.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Events Table */}
            <div className="glass-morphism" style={{ padding: '40px' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>Gestión de Eventos</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                            <th style={{ padding: '20px' }}>Evento</th>
                            <th style={{ padding: '20px' }}>Categoría</th>
                            <th style={{ padding: '20px' }}>Fecha</th>
                            <th style={{ padding: '20px' }}>Vendidos</th>
                            <th style={{ padding: '20px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <img src={`http://localhost:5000${event.image}`} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                    {event.title}
                                </td>
                                <td style={{ padding: '20px' }}>{event.category}</td>
                                <td style={{ padding: '20px' }}>{new Date(event.date).toLocaleDateString()}</td>
                                <td style={{ padding: '20px' }}>{event.tickets.reduce((acc, t) => acc + t.sold, 0)} / {event.tickets.reduce((acc, t) => acc + t.stock + t.sold, 0)}</td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Link title="Ver Asistentes" to={`/admin/event/${event._id}/attendees`} className="glass-morphism" style={{ padding: '8px', color: 'var(--accent)' }}><Users size={18} /></Link>
                                        <Link title="Editar" to={`/admin/events/edit/${event._id}`} className="glass-morphism" style={{ padding: '8px' }}><Edit size={18} /></Link>
                                        <button title="Eliminar" onClick={() => handleDelete(event._id)} className="glass-morphism" style={{ padding: '8px', color: '#ff4d4d' }}><Trash size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
