import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Ticket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '0 20px' }}>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{ marginBottom: '30px' }}
            >
                <div style={{ background: 'rgba(0, 242, 254, 0.1)', padding: '30px', borderRadius: '50%' }}>
                    <CheckCircle size={100} color="var(--accent)" />
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px' }}
            >
                ¡Gracias por tu <span className="gradient-text">Compra!</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ color: 'var(--text-muted)', fontSize: '20px', maxWidth: '600px', marginBottom: '40px' }}
            >
                Tus boletos han sido confirmados y ya están disponibles en tu perfil. Prepárate para una experiencia inolvidable.
            </motion.p>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Link
                    to="/profile"
                    className="glass-morphism"
                    style={{ padding: '15px 30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <Ticket size={20} /> Ver mis Boletos
                </Link>
                <Link
                    to="/events"
                    className="gradient-bg"
                    style={{ padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    Explorar más <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
};

export default Success;
