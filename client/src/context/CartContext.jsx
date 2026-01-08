import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (event, ticketType, quantity) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.event._id === event._id && item.ticketType === ticketType.name
    );

    if (itemIndex > -1) {
      const newItems = [...cartItems];
      newItems[itemIndex].quantity += quantity;
      setCartItems(newItems);
    } else {
      setCartItems([...cartItems, { event, ticketType: ticketType.name, price: ticketType.price, quantity }]);
    }
  };

  const removeFromCart = (eventId, ticketType) => {
    setCartItems(cartItems.filter(item => !(item.event._id === eventId && item.ticketType === ticketType)));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
