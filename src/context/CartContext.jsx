import { createContext, useEffect, useState } from "react";
import axios from "../services/axios";
import { AuthContext } from "./AuthContext"; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext); 
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [!authLoading && user]);

  const addToCart = async (item) => {
    try {
      const payload = {
        ...item,
        quantity: Number(item.quantity) || 1, // Ensure numeric
      };
      const res = await axios.post("/api/cart/add", payload);
      setCart(res.data);
    } catch (err) {
      console.error("Add to cart error:", err.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${productId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Remove from cart error:", err.message);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("/api/cart/clear");
      // Re-fetch to get accurate backend total
      await fetchCart();
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
