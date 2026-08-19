import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const [orderPlaced, setOrderPlaced] = useState(false);

  // -------------------------
  // HANDLE INPUT
  // -------------------------

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(function (currentData) {
      return {
        ...currentData,
        [name]: value,
      };
    });

    setErrors(function (currentErrors) {
      return {
        ...currentErrors,
        [name]: "",
      };
    });
  }

  // -------------------------
  // VALIDATE FORM
  // -------------------------

  function validateForm() {
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Please enter your name";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone.trim() === "") {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain 10 digits";
    }

    if (formData.address.trim() === "") {
      newErrors.address = "Please enter your address";
    }

    if (formData.city.trim() === "") {
      newErrors.city = "Please enter your city";
    }

    if (formData.pincode.trim() === "") {
      newErrors.pincode = "Please enter your pincode";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must contain 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // -------------------------
  // PLACE ORDER
  // -------------------------

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Clear cart
    clearCart();

    // Show success screen
    setOrderPlaced(true);
  }

  // -------------------------
  // EMPTY CART
  // -------------------------

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="empty-checkout">
          <h1>Your cart is empty</h1>

          <p>Add some products before going to checkout.</p>

          <Link to="/" className="primary-btn">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  // -------------------------
  // SUCCESS SCREEN
  // -------------------------

  if (orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="order-success">
          <div className="success-icon">✓</div>

          <p className="eyebrow">Order Confirmed</p>

          <h1>Thank You!</h1>

          <p>Your order has been placed successfully.</p>

          <p className="order-message">
            We have received your order and will process it shortly.
          </p>

          <button className="primary-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  // -------------------------
  // CHECKOUT PAGE
  // -------------------------

  return (
    <section className="checkout-page">
      <div className="section-title">
        <p>Complete Your Order</p>

        <h1>Checkout</h1>
      </div>

      <div className="checkout-container">
        {/* =====================
                    CHECKOUT FORM
                ===================== */}

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          {/* NAME */}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <small className="field-error">{errors.name}</small>
            )}
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <small className="field-error">{errors.email}</small>
            )}
          </div>

          {/* PHONE */}

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="10 digit phone number"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
            />

            {errors.phone && (
              <small className="field-error">{errors.phone}</small>
            )}
          </div>

          {/* ADDRESS */}

          <div className="form-group">
            <label htmlFor="address">Address</label>

            <textarea
              id="address"
              name="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleChange}
            />

            {errors.address && (
              <small className="field-error">{errors.address}</small>
            )}
          </div>

          {/* CITY + PINCODE */}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>

              <input
                id="city"
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />

              {errors.city && (
                <small className="field-error">{errors.city}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>

              <input
                id="pincode"
                type="text"
                name="pincode"
                placeholder="6 digit pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength="6"
              />

              {errors.pincode && (
                <small className="field-error">{errors.pincode}</small>
              )}
            </div>
          </div>

          <button type="submit" className="place-order-button">
            Place Order
          </button>
        </form>

        {/* =====================
                    ORDER SUMMARY
                ===================== */}

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {cartItems.map(function (item) {
              return (
                <div className="checkout-item" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />

                  <div>
                    <h3>{item.title}</h3>

                    <p>Qty: {item.quantity}</p>
                  </div>

                  <strong>
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </strong>
                </div>
              );
            })}
          </div>

          <hr />

          <div className="checkout-summary-row">
            <span>Subtotal</span>

            <strong>${cartTotal.toFixed(2)}</strong>
          </div>

          <div className="checkout-summary-row">
            <span>Shipping</span>

            <strong>Free</strong>
          </div>

          <hr />

          <div className="checkout-total">
            <span>Total</span>

            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
