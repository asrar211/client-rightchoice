import { createContext, useEffect, useState } from "react";
import axios from "../services/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/cart");
        setCart(res.data);
      } catch (err) {
        console.error("Failed to fetch cart:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Add item to cart
  const addToCart = async (item) => {
    try {
      const res = await axios.post("/api/cart/add", item);
      setCart(res.data);
    } catch (err) {
      console.error("Add to cart error:", err.message);
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${productId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Remove from cart error:", err.message);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await axios.delete("/api/cart/clear");
      setCart(prev => ({ ...prev, items: [], total: 0 }));
    } catch (err) {
      console.error("Clear cart error:", err.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount: cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
        totalPrice: cart?.total || 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
