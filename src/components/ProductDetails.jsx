import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { getProductById } from "../services/api";

import { useCart } from "../context/CartContext";

import Toast from "./Toast";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [toast, setToast] = useState(null);

  /* =====================================================
     LOAD PRODUCT
     ===================================================== */

  useEffect(
    function () {
      setLoading(true);

      setError("");

      getProductById(id)
        .then(function (data) {
          setProduct(data);

          setLoading(false);
        })

        .catch(function () {
          setError("Unable to load product");

          setLoading(false);
        });
    },
    [id],
  );

  /* =====================================================
     INCREASE QUANTITY
     ===================================================== */

  function increaseQuantity() {
    setQuantity(function (currentQuantity) {
      return currentQuantity + 1;
    });
  }

  /* =====================================================
     DECREASE QUANTITY
     ===================================================== */

  function decreaseQuantity() {
    setQuantity(function (currentQuantity) {
      if (currentQuantity > 1) {
        return currentQuantity - 1;
      }

      return 1;
    });
  }

  /* =====================================================
     ADD TO CART
     ===================================================== */

  function handleAddToCart() {
    addToCart({
      id: product.id,

      title: product.title,

      price: product.price,

      thumbnail: product.thumbnail,

      quantity: quantity,
    });

    setToast({
      message: `${quantity} ${quantity === 1 ? "item" : "items"} of ${
        product.title
      } added to cart`,

      type: "success",
    });
  }

  /* =====================================================
     LOADING
     ===================================================== */

  if (loading) {
    return (
      <div className="details-message">
        <p>Loading product...</p>
      </div>
    );
  }

  /* =====================================================
     ERROR
     ===================================================== */

  if (error || !product) {
    return (
      <div className="details-message">
        <p>{error || "Product not found"}</p>

        <Link to="/">← Back to Products</Link>
      </div>
    );
  }

  /* =====================================================
     PRODUCT DETAILS
     ===================================================== */

  return (
    <>
      <section className="product-details">
        {/* PRODUCT IMAGE */}

        <div className="details-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        {/* PRODUCT INFORMATION */}

        <div className="details-info">
          <p className="details-category">{product.category}</p>

          <h1>{product.title}</h1>

          <p className="details-rating">⭐ {product.rating}</p>

          <h2 className="details-price">${Number(product.price).toFixed(2)}</h2>

          <p className="details-description">{product.description}</p>

          {/* QUANTITY */}

          <div className="quantity-box">
            <span>Quantity</span>

            <div className="quantity-controls">
              <button onClick={decreaseQuantity} aria-label="Decrease quantity">
                −
              </button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity} aria-label="Increase quantity">
                +
              </button>
            </div>
          </div>

          {/* ADD TO CART */}

          <button className="details-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* BACK */}

          <Link to="/" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </section>

      {/* TOAST */}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={function () {
            setToast(null);
          }}
        />
      )}
    </>
  );
}

export default ProductDetails;
