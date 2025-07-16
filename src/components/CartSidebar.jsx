import React from "react";

const CartSidebar = ({ cartItems, updateQuantity, removeItem }) => {
  return (
    <div
      className="position-fixed top-0 end-0 bg-white shadow p-3 "
      style={{
        width: "300px",
        height: "100vh",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      <h4 className="mb-4 border-bottom pb-3">
        🛒 Cart <span className="badge bg-secondary ">{cartItems.length}</span>
      </h4>

      {cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div className="card mb-3" key={item.id}>
            <div className="row g-0 align-items-center">
              <div className="col-4">
                <img
                  src={item.image}
                  className="img-fluid rounded-start"
                  alt={item.title}
                  style={{ objectFit: "contain", height: "60px" }}
                />
              </div>
              <div className="col-8">
                <div className="card-body p-2">
                  <h6 className="card-title mb-1">{item.title}</h6>
                  <p className="card-text mb-1">
                    <small className="text-muted">{item.price} EGP</small>
                  </p>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small>Total: {item.price * item.quantity} EGP</small>  
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartSidebar;
