import { useContext, useState } from "react";
import { CartContext } from "../context/CartContextProvider";
import { Link, useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 2500);
  };

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">No items in cart</h2>
        <Link to="/products" className="text-blue-500 underline cursor-pointer">
          Shop Now
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></span>
        <h2 className="text-2xl font-bold mb-2 text-green-700">
          Order Placed!
        </h2>
        <p className="text-gray-600">Thank you for shopping with us.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <form
        onSubmit={handleOrder}
        className="bg-white rounded shadow p-6 space-y-6"
      >
        {/* Address */}
        <div>
          <label className="block font-semibold mb-2">Shipping Address</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full address"
          />
        </div>
        {/* Payment */}
        <div>
          <label className="block font-semibold mb-2">Payment Method</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
              />
              Credit/Debit Card
            </label>
          </div>
        </div>
        {/* Cart Summary */}
        <div>
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <ul className="mb-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * (item.quantity || 1)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        {/* Place Order */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!address || !payment}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
