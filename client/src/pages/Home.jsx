import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, Search, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('Todos');

    const categories = ['Todos', 'Concierto', 'Deportes', 'Teatro', 'Conferencia'];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
                setEvents(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'Todos' || e.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ padding: '0 40px' }}>
            {/* Hero Section */}
            <section style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: '72px', fontWeight: '800', maxWidth: '800px', lineHeight: '1.1', marginBottom: '30px' }}
                >
                    Vive la emoción de tus <span className="gradient-text">Eventos Favoritos</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass-morphism"
                    style={{ padding: '10px', display: 'flex', width: '100%', maxWidth: '600px', gap: '10px' }}
                >
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 15px' }}>
                        <Search size={20} color="var(--text-muted)" />
                        <input
                            type="text"
                            placeholder="Busca por nombre, artista o ciudad..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ background: 'transparent', border: 'none', width: '100%', color: 'white', outline: 'none', padding: '10px 10px' }}
                        />
                    </div>
                    <button
                        onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
                        className="gradient-bg"
                        style={{ padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        Explorar <ArrowRight size={20} />
                    </button>
                </motion.div>
            </section>

            {/* Events Grid */}
            <section id="catalog" style={{ margin: '80px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '36px', fontWeight: '800' }}>Próximos Eventos</h2>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={filterCategory === cat ? 'gradient-bg' : 'glass-morphism'}
                                    style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Link to="/events" className="gradient-text" style={{ fontWeight: '600' }}>Ver todo</Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {filteredEvents.map((event) => (
                        <motion.div
                            key={event._id}
                            whileHover={{ y: -10 }}
                            className="glass-morphism"
                            style={{ overflow: 'hidden', cursor: 'pointer' }}
                        >
                            <Link to={`/event/${event._id}`}>
                                <div style={{ height: '400px', background: `url(${event.image ? `http://localhost:5000${event.image}` : 'https://via.placeholder.com/400x600'}) center/cover` }}>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{event.category}</span>
                                    <h3 style={{ fontSize: '24px', margin: '10px 0' }}>{event.title}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={16} /> {new Date(event.date).toLocaleDateString()}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MapPin size={16} /> {event.location}
                                        </div>
                                    </div>
                                    <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '20px', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Desde ${Math.min(...event.tickets.map(t => t.price))}</span>
                                        <button className="glass-morphism" style={{ padding: '8px 15px', fontSize: '14px' }}>Boletos</button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
