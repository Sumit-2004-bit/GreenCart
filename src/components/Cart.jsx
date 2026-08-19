import { useState } from "react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import Toast from "./Toast";


function Cart() {

  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();


  const [toast, setToast] = useState(null);


  const totalItems = cartItems.reduce(
    function (total, item) {

      return total + item.quantity;

    },
    0
  );


  // -------------------------
  // REMOVE PRODUCT
  // -------------------------

  function handleRemove(item) {

    removeFromCart(item.id);


    setToast({

      message:
        `${item.title} removed from cart`,

      type: "success",

    });

  }


  // -------------------------
  // CLEAR CART
  // -------------------------

  function handleClearCart() {

    clearCart();


    setToast({

      message:
        "Cart cleared successfully",

      type: "success",

    });

  }


  return (

    <section className="cart-page">


      {/* -------------------------
          PAGE TITLE
          ------------------------- */}

      <div className="section-title">

        <p>
          Your Shopping Cart
        </p>


        <h1>
          Shopping Cart
        </h1>

      </div>


      {/* -------------------------
          EMPTY CART
          ------------------------- */}

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <h2>
            Your cart is empty
          </h2>


          <p>
            Add some products to your cart.
          </p>


          <Link
            to="/"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="cart-container">


          {/* -------------------------
              CART ITEMS
              ------------------------- */}

          <div className="cart-items">

            {cartItems.map(function (item) {

              return (

                <div
                  className="cart-item"
                  key={item.id}
                >


                  {/* PRODUCT IMAGE */}

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />


                  {/* PRODUCT INFO */}

                  <div className="cart-item-info">

                    <h3>
                      {item.title}
                    </h3>


                    <p>
                      $
                      {Number(
                        item.price
                      ).toFixed(2)}
                    </p>

                  </div>


                  {/* QUANTITY */}

                  <div className="cart-quantity">

                    <button
                      type="button"
                      onClick={function () {

                        decreaseQuantity(
                          item.id
                        );

                      }}
                    >
                      −
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      type="button"
                      onClick={function () {

                        increaseQuantity(
                          item.id
                        );

                      }}
                    >
                      +
                    </button>

                  </div>


                  {/* TOTAL */}

                  <strong className="cart-item-total">

                    $
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}

                  </strong>


                  {/* REMOVE */}

                  <button
                    type="button"
                    className="remove-button"
                    onClick={function () {

                      handleRemove(item);

                    }}
                  >
                    Remove
                  </button>

                </div>

              );

            })}

          </div>


          {/* -------------------------
              SUMMARY
              ------------------------- */}

          <aside className="cart-summary">

            <h2>
              Order Summary
            </h2>


            <div className="summary-row">

              <span>
                Items
              </span>


              <span>
                {totalItems}
              </span>

            </div>


            <div className="summary-row">

              <span>
                Subtotal
              </span>


              <span>
                ${cartTotal.toFixed(2)}
              </span>

            </div>


            <div className="summary-row">

              <span>
                Shipping
              </span>


              <span>
                Free
              </span>

            </div>


            <hr />


            <div className="summary-total">

              <span>
                Total
              </span>


              <strong>
                ${cartTotal.toFixed(2)}
              </strong>

            </div>


            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Checkout
            </Link>


            {/* CLEAR CART */}

            <button
              type="button"
              className="remove-button clear-cart-button"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>


            {/* CONTINUE SHOPPING */}

            <Link
              to="/"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </aside>

        </div>

      )}


      {/* -------------------------
          TOAST NOTIFICATION
          ------------------------- */}

      {toast && (

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={function () {

            setToast(null);

          }}
        />

      )}

    </section>

  );

}


export default Cart;