import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, Mail, Ticket, ArrowLeft, Download } from 'lucide-react';

const AdminAttendees = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [attendees, setAttendees] = useState([]);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventRes, attendeesRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/events/${eventId}`),
                    axios.get(`http://localhost:5000/api/tickets/event/${eventId}`)
                ]);
                setEvent(eventRes.data);
                setAttendees(attendeesRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [eventId]);

    const exportCSV = () => {
        const headers = ['Nombre', 'Email', 'Tipo de Boleto', 'Cantidad', 'Precio Total', 'Fecha Compra'];
        const rows = attendees.map(a => [
            a.userId.name,
            a.userId.email,
            a.ticketType,
            a.quantity,
            a.totalPrice,
            new Date(a.purchaseDate).toLocaleDateString()
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(r => r.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `asistentes_${event?.title.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
    };

    if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Cargando asistentes...</div>;

    return (
        <div style={{ padding: '0 40px' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px' }}>
                <ArrowLeft size={20} /> Volver al Dashboard
            </button>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
                <div>
                    <span className="gradient-text" style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Lista de Asistentes</span>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginTop: '10px' }}>{event?.title}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>{attendees.length} personas han comprado boletos para este evento.</p>
                </div>
                <button onClick={exportCSV} className="glass-morphism" style={{ padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)' }}>
                    <Download size={20} /> Exportar CSV
                </button>
            </header>

            <div className="glass-morphism" style={{ padding: '40px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                            <th style={{ padding: '20px' }}>Nombre</th>
                            <th style={{ padding: '20px' }}>Contacto</th>
                            <th style={{ padding: '20px' }}>Boleto</th>
                            <th style={{ padding: '20px' }}>Cant.</th>
                            <th style={{ padding: '20px' }}>Total</th>
                            <th style={{ padding: '20px' }}>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendees.map((a, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{ borderBottom: '1px solid var(--glass-border)' }}
                            >
                                <td style={{ padding: '20px', fontWeight: 'bold' }}>{a.userId.name}</td>
                                <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Mail size={14} /> {a.userId.email}
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '20px', fontSize: '12px' }}>
                                        {a.ticketType}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>{a.quantity}</td>
                                <td style={{ padding: '20px', fontWeight: 'bold' }}>${a.totalPrice}</td>
                                <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{new Date(a.purchaseDate).toLocaleDateString()}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {attendees.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>
                        <Users size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
                        <p>No hay compradores registrados para este evento todavía.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAttendees;
