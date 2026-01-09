import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetail from './pages/EventDetail';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import AdminDashboard from './pages/AdminDashboard';
import AdminEventForm from './pages/AdminEventForm';
import AdminAttendees from './pages/AdminAttendees';
import Contact from './pages/Contact';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main style={{ paddingBottom: '100px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />

                <Route path="/admin/dashboard" element={
                  <PrivateRoute adminOnly={true}>
                    <AdminDashboard />
                  </PrivateRoute>
                } />
                <Route path="/admin/events/new" element={
                  <PrivateRoute adminOnly={true}>
                    <AdminEventForm />
                  </PrivateRoute>
                } />
                <Route path="/admin/events/edit/:id" element={
                  <PrivateRoute adminOnly={true}>
                    <AdminEventForm />
                  </PrivateRoute>
                } />
                <Route path="/admin/event/:eventId/attendees" element={
                  <PrivateRoute adminOnly={true}>
                    <AdminAttendees />
                  </PrivateRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
