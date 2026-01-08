import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Save, Plus, Trash, ArrowLeft } from 'lucide-react';

const AdminEventForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: 'Concierto',
        tickets: [{ name: 'General', price: 0, stock: 0 }]
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (isEdit) {
            const fetchEvent = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/events/${id}`);
                    const date = new Date(res.data.date).toISOString().split('T')[0];
                    setFormData({ ...res.data, date });
                } catch (err) {
                    console.error(err);
                }
            };
            fetchEvent();
        }
    }, [id, isEdit]);

    const handleTicketChange = (index, field, value) => {
        const newTickets = [...formData.tickets];
        newTickets[index][field] = value;
        setFormData({ ...formData, tickets: newTickets });
    };

    const addTicketType = () => {
        setFormData({ ...formData, tickets: [...formData.tickets, { name: '', price: 0, stock: 0 }] });
    };

    const removeTicketType = (index) => {
        const newTickets = formData.tickets.filter((_, i) => i !== index);
        setFormData({ ...formData, tickets: newTickets });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('location', formData.location);
        data.append('category', formData.category);
        data.append('tickets', JSON.stringify(formData.tickets));
        if (image) data.append('image', image);

        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/events/${id}`, data);
            } else {
                await axios.post('http://localhost:5000/api/events', data);
            }
            navigate('/admin/dashboard');
        } catch (err) {
            alert('Error al guardar el evento');
        }
    };

    return (
        <div style={{ padding: '0 40px', maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px' }}>
                <ArrowLeft size={20} /> Volver
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-morphism" style={{ padding: '40px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>{isEdit ? 'Editar' : 'Crear'} <span className="gradient-text">Evento</span></h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Título del Evento</label>
                            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Categoría</label>
                            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                <option value="Concierto" style={{ background: '#1a1a24' }}>Concierto</option>
                                <option value="Teatro" style={{ background: '#1a1a24' }}>Teatro</option>
                                <option value="Deportes" style={{ background: '#1a1a24' }}>Deportes</option>
                                <option value="Conferencia" style={{ background: '#1a1a24' }}>Conferencia</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label>Descripción</label>
                        <textarea rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', padding: '12px' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Fecha</label>
                            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Ubicación</label>
                            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label>Imagen del Póster</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3>Tipos de Boletos e Inventario</h3>
                            <button type="button" onClick={addTicketType} className="glass-morphism" style={{ padding: '8px 15px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Plus size={18} /> Agregar Tipo
                            </button>
                        </div>

                        {formData.tickets.map((t, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 50px', gap: '15px', marginBottom: '15px', alignItems: 'end' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Categoría de Boleto</label>
                                    <input placeholder="Ej. VIP, General" value={t.name} onChange={(e) => handleTicketChange(i, 'name', e.target.value)} required />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Precio ($)</label>
                                    <input type="number" placeholder="0" value={t.price} onChange={(e) => handleTicketChange(i, 'price', e.target.value)} required />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cantidad (Stock)</label>
                                    <input type="number" placeholder="0" value={t.stock} onChange={(e) => handleTicketChange(i, 'stock', e.target.value)} required />
                                </div>
                                <button type="button" onClick={() => removeTicketType(i)} disabled={formData.tickets.length === 1} style={{ background: 'none', color: '#ff4d4d', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Trash size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="gradient-bg" style={{ padding: '18px', borderRadius: '16px', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                        <Save size={24} /> {isEdit ? 'Actualizar Evento' : 'Publicar Evento'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminEventForm;
