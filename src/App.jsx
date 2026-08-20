import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./context/AuthContext";

import "./App.css";

function App() {
  // =========================
  // SEARCH
  // =========================

  const [searchText, setSearchText] = useState("");

  // =========================
  // CATEGORY
  // =========================

  const [selectedCategory, setSelectedCategory] = useState("all");

  // =========================
  // SORT
  // =========================

  const [sortOption, setSortOption] = useState("default");

  // =========================
  // SEARCH HANDLER
  // =========================

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  // =========================
  // CATEGORY HANDLER
  // =========================

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // =========================
  // SORT HANDLER
  // =========================

  function handleSortChange(event) {
    setSortOption(event.target.value);
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* =========================
            NAVBAR
            ========================= */}

        <Navbar searchText={searchText} handleSearch={handleSearch} />

        <Routes>
          {/* =========================
              HOME
              ========================= */}

          <Route
            path="/"
            element={
              <>
                <Hero />

                {/* =========================
                    CATEGORIES
                    ========================= */}

                <Categories
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategoryChange}
                />

                {/* =========================
                    PRODUCTS
                    ========================= */}

                <Products
                  searchText={searchText}
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategoryChange}
                  sortOption={sortOption}
                  handleSortChange={handleSortChange}
                />

                <Footer />
              </>
            }
          />

          {/* =========================
              PRODUCT DETAILS
              ========================= */}

          <Route path="/products/:id" element={<ProductDetails />} />

          {/* =========================
              CART
              ========================= */}

          <Route path="/cart" element={<Cart />} />

          {/* =========================
              LOGIN
              ========================= */}

          <Route path="/login" element={<Login />} />

          {/* =========================
              REGISTER
              ========================= */}

          <Route path="/register" element={<Register />} />

          {/* =========================
              PROTECTED CHECKOUT
              ========================= */}

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
