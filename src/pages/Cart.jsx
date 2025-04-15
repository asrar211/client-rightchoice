import { useEffect } from "react";
import useCart from "../hooks/useCart";
import { ToastContainer, toast } from "react-toastify";

export const Cart = () => {
  const { cart, loading, removeFromCart, clearCart, itemCount, totalPrice } = useCart();

  const uniqueProductCount = cart?.items ? new Set(cart.items.map(item => item.productId)).size : 0;

  useEffect(() => {
    toast.info(`You have ${uniqueProductCount} items in your cart.`, { autoClose: 2000 });
  }, [uniqueProductCount]);

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast.error(`${productName} removed from cart`, { autoClose: 1500 });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast.warn("Cart has been cleared", { autoClose: 1500 });
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...", { autoClose: 2000 });
  };

  if (loading) return <div className="p-4 text-center">Loading your cart...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {!cart || cart.items?.length === 0 ? (
        <div className="text-gray-500 text-lg">Your cart is empty.</div>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li
                key={item.productId}
                className="border rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="flex gap-4 items-center">
                  <img src={item.image} className="w-24 h-24 object-cover rounded" alt={item.name} />
                  <div>
                    <p className="font-medium text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x ₹{item.price}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-sm"
                  onClick={() => handleRemoveItem(item.productId, item.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 flex flex-col gap-3">
            <p className="text-xl font-semibold">Total: ₹{totalPrice}</p>
            <div className="flex gap-4">
              <button
                onClick={handleClearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
