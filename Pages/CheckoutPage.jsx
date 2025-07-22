import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "./CheckoutPage.css";
import visaIcon from "../assets/visa.png";
import codIcon from "../assets/cod.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = ({ cartItems, toggleSidebar }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deliveryDate) {
      toast.warning("Please select a delivery date.");
      return;
    }

    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvv)) {
      toast.error("Please fill in your card details.");
      return;
    }

    toast.success(
      `Order confirmed! Payment method: ${
        paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"
      }. Delivery date: ${deliveryDate}`
    );
  };

  return (
    <div className="checkout-wrapper">
      <NavBar
        toggleSidebar={toggleSidebar}
        cartItems={cartItems}
        searchTerm=""
        setSearchTerm={() => {}}
      />

      <div className="checkout-page">
        <h2>🧾 Checkout</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">
            Your cart is empty. Add some products first!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="checkout-table-container">
              <table className="checkout-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="product-image2"
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.price.toFixed(2)} EGP</td>
                      <td>{item.quantity}</td>
                      <td>{(item.price * item.quantity).toFixed(2)} EGP</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="checkout-summary">
                <h3>Total: {total.toFixed(2)} EGP</h3>

                <div className="payment-method">
                  <h4>Payment Method</h4>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <img src={codIcon} alt="Cash" className="pay-icon" />
                    Cash on Delivery
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <img src={visaIcon} alt="Visa" className="pay-icon" />
                    Credit / Debit Card
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="card-details">
                    <h4>Card Details</h4>
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Expiry Date (MM/YY)"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                )}

                <div className="delivery-date">
                  <h4>Preferred Delivery Date</h4>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>

                <button type="submit" className="checkout-btn">
                  Confirm Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CheckoutPage;
