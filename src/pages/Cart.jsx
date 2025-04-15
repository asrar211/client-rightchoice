import useCart from "../hooks/useCart";

export const Cart = () => {
  const { cart, loading, removeFromCart, clearCart, itemCount, totalPrice } = useCart();

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart ({itemCount} items)</h2>

      {cart?.items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.items.map((item) => (
              <li key={item.productId} className="border-b py-2 flex justify-between">
                <div>
                  <p>{item.name}</p>
                  <p>{item.quantity} x ₹{item.price}</p>
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <p className="font-semibold">Total: ₹{totalPrice}</p>
            <button
              onClick={clearCart}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

