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

    // Calcular resumen por tipo de boleto
    const typeSummary = event?.tickets.map(type => {
        const sold = attendees
            .filter(a => a.ticketType === type.name)
            .reduce((acc, curr) => acc + curr.quantity, 0);
        return { ...type, actualSold: sold };
    }) || [];

    const exportCSV = () => {
        const headers = ['Nombre', 'Email', 'Telefono', 'Tipo de Boleto', 'Cantidad', 'Precio Total', 'Fecha Compra'];
        const rows = attendees.map(a => [
            a.userId.name,
            a.userId.email,
            `${a.userId.countryCode}${a.userId.phone}`,
            a.ticketType,
            a.quantity,
            a.totalPrice,
            new Date(a.purchaseDate).toLocaleDateString()
        ]);

        let csvContent = "data:text/csv;charset=utf-8,\uFEFF" // BOM for Excel
            + headers.join(",") + "\n"
            + rows.map(r => r.map(cell => `"${cell}"`).join(",")).join("\n");

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
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px', cursor: 'pointer' }}>
                <ArrowLeft size={20} /> Volver al Dashboard
            </button>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <span className="gradient-text" style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Lista de Asistentes</span>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginTop: '10px' }}>{event?.title}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>{attendees.reduce((acc, a) => acc + a.quantity, 0)} boletos vendidos a {new Set(attendees.map(a => a.userId._id)).size} personas.</p>
                </div>
                <button onClick={exportCSV} className="glass-morphism" style={{ padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)', border: 'none', cursor: 'pointer' }}>
                    <Download size={20} /> Exportar CSV
                </button>
            </header>

            {/* Resumen por tipo */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {typeSummary.map((type, i) => (
                    <div key={i} className="glass-morphism" style={{ padding: '20px', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '5px' }}>{type.name}</p>
                        <h3 style={{ fontSize: '24px', fontWeight: '800' }}>{type.actualSold} <small style={{ fontSize: '12px', fontWeight: 'normal', opacity: 0.6 }}>/ {type.stock + type.actualSold}</small></h3>
                    </div>
                ))}
            </div>

            <div className="glass-morphism" style={{ padding: '40px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                            <th style={{ padding: '20px' }}>Comprador</th>
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
                                <td style={{ padding: '20px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{a.userId.name}</div>
                                </td>
                                <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '13px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={12} /> {a.userId.email}</div>
                                        {a.userId.phone && <div style={{ opacity: 0.8 }}>☏ {a.userId.countryCode} {a.userId.phone}</div>}
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', color: 'var(--accent)' }}>
                                        {a.ticketType}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>{a.quantity}</td>
                                <td style={{ padding: '20px', fontWeight: 'bold' }}>${a.totalPrice}</td>
                                <td style={{ padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>{new Date(a.purchaseDate).toLocaleDateString()}</td>
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
