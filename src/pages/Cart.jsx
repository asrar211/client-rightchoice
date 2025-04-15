import useCart from "../hooks/useCart";

export const Cart = () => {
  const { cart, loading, removeFromCart, clearCart, itemCount, totalPrice } = useCart();

  if (loading) return <div className="p-4 text-center">Loading your cart...</div>;

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {!cart || cart.items?.length === 0 ? (
  <div className="text-gray-500 text-lg">Your cart is empty.</div>
) : (
  <>
    <ul className="space-y-4">
      {cart.items.map((item) => (
        <li
          key={item.productId}
          className="border rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
        >
          <div>
            <img src={item.image} className="w-24 h-24 object-cover rounded" alt={item.name} />
            <p className="font-medium text-lg">{item.name}</p>
            <p className="text-sm text-gray-600">
              {item.quantity} x ₹{item.price}
            </p>
          </div>
          <button
            className="bg-red-600 text-white p-2 hover:text-red-800 font-semibold"
            onClick={() => removeFromCart(item.productId)}
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
          onClick={() => alert("Proceeding to checkout...")}
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
