import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

/* =========================================================
   LOAD SAVED CART
   ========================================================= */

function getSavedCart() {
  try {
    const savedCart = localStorage.getItem("greencart-cart");

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    // Make sure saved data is an array

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart;
  } catch (error) {
    console.log("Could not load cart:", error);

    return [];
  }
}

/* =========================================================
   CART PROVIDER
   ========================================================= */

export function CartProvider({ children }) {
  /* =======================================================
     CART STATE
     ======================================================= */

  const [cartItems, setCartItems] = useState(getSavedCart);

  /* =======================================================
     SAVE CART TO LOCAL STORAGE
     ======================================================= */

  useEffect(
    function () {
      try {
        localStorage.setItem(
          "greencart-cart",

          JSON.stringify(cartItems),
        );
      } catch (error) {
        console.log("Could not save cart:", error);
      }
    },
    [cartItems],
  );

  /* =======================================================
     ADD TO CART
     ======================================================= */

  function addToCart(product) {
    const quantityToAdd = Number(product.quantity) || 1;

    setCartItems(function (currentItems) {
      /* ---------------------------------------------------
         CHECK IF PRODUCT ALREADY EXISTS
         --------------------------------------------------- */

      const existingProduct = currentItems.find(function (item) {
        return item.id === product.id;
      });

      /* ---------------------------------------------------
         PRODUCT ALREADY EXISTS
         --------------------------------------------------- */

      if (existingProduct) {
        return currentItems.map(function (item) {
          if (item.id === product.id) {
            return {
              ...item,

              quantity: item.quantity + quantityToAdd,
            };
          }

          return item;
        });
      }

      /* ---------------------------------------------------
         ADD NEW PRODUCT
         --------------------------------------------------- */

      return [
        ...currentItems,

        {
          id: product.id,

          title: product.title,

          price: Number(product.price) || 0,

          thumbnail: product.thumbnail,

          quantity: quantityToAdd,
        },
      ];
    });
  }

  /* =======================================================
     INCREASE QUANTITY
     ======================================================= */

  function increaseQuantity(productId) {
    setCartItems(function (currentItems) {
      return currentItems.map(function (item) {
        if (item.id === productId) {
          return {
            ...item,

            quantity: item.quantity + 1,
          };
        }

        return item;
      });
    });
  }

  /* =======================================================
     DECREASE QUANTITY
     ======================================================= */

  function decreaseQuantity(productId) {
    setCartItems(function (currentItems) {
      return currentItems.map(function (item) {
        if (item.id === productId) {
          return {
            ...item,

            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          };
        }

        return item;
      });
    });
  }

  /* =======================================================
     REMOVE PRODUCT
     ======================================================= */

  function removeFromCart(productId) {
    setCartItems(function (currentItems) {
      return currentItems.filter(function (item) {
        return item.id !== productId;
      });
    });
  }

  /* =======================================================
     CLEAR CART
     ======================================================= */

  function clearCart() {
    setCartItems([]);
  }

  /* =======================================================
     CART COUNT
     ======================================================= */

  const cartCount = cartItems.reduce(function (total, item) {
    return total + Number(item.quantity || 0);
  }, 0);

  /* =======================================================
     CART TOTAL
     ======================================================= */

  const cartTotal = cartItems.reduce(function (total, item) {
    return total + Number(item.price || 0) * Number(item.quantity || 0);
  }, 0);

  /* =======================================================
     CONTEXT VALUE
     ======================================================= */

  const contextValue = {
    cartItems,

    cartCount,

    cartTotal,

    addToCart,

    increaseQuantity,

    decreaseQuantity,

    removeFromCart,

    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

/* =========================================================
   CUSTOM HOOK
   ========================================================= */

export function useCart() {
  return useContext(CartContext);
}
