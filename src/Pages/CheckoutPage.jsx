import React, { useState } from "react";
import "./CheckoutPage.css";
import visaIcon from "../assets/visa.png";
import codIcon from "../assets/cod.png";

const CheckoutPage = ({ cartItems }) => {
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
      alert("Please select a delivery date.");
      return;
    }

    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvv)) {
      alert("Please fill in your card details.");
      return;
    }

    alert(
      `Order confirmed!\nPayment method: ${
        paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"
      }\nDelivery date: ${deliveryDate}`
    );
  };

  return (
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

              {/* 🧾 Payment Methods */}
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

              {/* 💳 Card Details */}
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

              {/* 📆 Delivery Date */}
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
  );
};

export default CheckoutPage;
