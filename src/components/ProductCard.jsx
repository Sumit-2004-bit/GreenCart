import { useState } from "react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import Toast from "./Toast";

function ProductCard(props) {
  const { addToCart } = useCart();

  const [toast, setToast] = useState(null);

  function handleAddToCart(event) {
    event.preventDefault();

    event.stopPropagation();

    addToCart({
      id: props.id,

      title: props.name,

      price: props.price,

      thumbnail: props.image,
    });

    setToast({
      message: `${props.name} added to cart`,

      type: "success",
    });
  }

  return (
    <>
      <article className="product-card">
        {/* PRODUCT IMAGE */}

        <Link to={`/products/${props.id}`} className="product-link">
          <div className="product-image">
            <img src={props.image} alt={props.name} loading="lazy" />

            <span className="view-product">View Product</span>
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="product-info">
            <p className="product-category">{props.category}</p>

            <h3>{props.name}</h3>

            <div className="product-bottom">
              <div>
                <p className="product-rating">
                  ⭐ {Number(props.rating).toFixed(1)}
                </p>

                <strong>${Number(props.price).toFixed(2)}</strong>
              </div>

              <span className="product-arrow">→</span>
            </div>
          </div>
        </Link>

        {/* ADD TO CART */}

        <div className="product-cart-button">
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </article>

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

export default ProductCard;
