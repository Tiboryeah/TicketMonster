import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, HelpCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simular envío
        console.log('Mensaje enviado:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '40px 20px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-morphism"
                style={{ padding: '40px', width: '100%', maxWidth: '800px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}
            >
                {/* Información de Contacto */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Ponte en <span className="gradient-text">Contacto</span></h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
                        ¿Tienes alguna duda sobre tus boletos o alguna queja sobre el servicio?
                        Estamos aquí para ayudarte 24/7.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div className="gradient-bg" style={{ padding: '12px', borderRadius: '12px' }}>
                                <Mail size={24} color="white" />
                            </div>
                            <div>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Correo Electrónico</p>
                                <p style={{ fontWeight: 'bold' }}>soporte@ticketmonster.com</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div className="glass-morphism" style={{ padding: '12px', borderRadius: '12px', borderColor: 'var(--accent)' }}>
                                <HelpCircle size={24} color="var(--accent)" />
                            </div>
                            <div>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Centro de Ayuda</p>
                                <p style={{ fontWeight: 'bold' }}>FAQS y Soporte Técnico</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '50px', padding: '20px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px dashed var(--glass-border)' }}>
                        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '14px' }}>
                            "Nuestra misión es que solo te preocupes por disfrutar el show. Nosotros nos encargamos del resto."
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <div style={{ flex: '1.2', minWidth: '300px' }}>
                    {submitted ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '20px' }}
                        >
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 255, 0, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#00ff00', border: '2px solid #00ff00' }}>
                                <Send size={32} />
                            </div>
                            <h3>¡Mensaje Enviado!</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Hemos recibido tu consulta. Un experto de TicketMonster te contactará pronto.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                style={{ background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                            >
                                Enviar otro mensaje
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>Tu Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Juan Pérez"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>Correo Electrónico</label>
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>Asunto</label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                                >
                                    <option value="" style={{ background: '#1a1a24' }}>Selecciona un motivo</option>
                                    <option value="duda" style={{ background: '#1a1a24' }}>Duda sobre boletos</option>
                                    <option value="queja" style={{ background: '#1a1a24' }}>Queja o Reclamo</option>
                                    <option value="evento" style={{ background: '#1a1a24' }}>Información de Evento</option>
                                    <option value="otro" style={{ background: '#1a1a24' }}>Otro</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>Mensaje</label>
                                <textarea
                                    rows="5"
                                    placeholder="Cuéntanos cómo podemos ayudarte..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', resize: 'none' }}
                                ></textarea>
                            </div>
                            <button type="submit" className="gradient-bg" style={{ padding: '15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Send size={20} /> Enviar Mensaje
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
