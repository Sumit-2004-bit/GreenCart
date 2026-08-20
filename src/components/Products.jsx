import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import { getProducts } from "../services/api";

function Products(props) {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(function () {
    setLoading(true);

    getProducts()
      .then(function (data) {
        setProducts(Array.isArray(data) ? data : []);

        setLoading(false);
      })

      .catch(function (err) {
        console.log("Product error:", err);

        setError("Unable to load products.");

        setLoading(false);
      });
  }, []);

  // =========================
  // CATEGORY CHANGE
  // =========================

  function handleCategorySelect(event) {
    const category = event.target.value;

    props.handleCategoryChange(category);
  }

  // =========================
  // SEARCH + CATEGORY FILTER
  // =========================

  const filteredProducts = products.filter(function (product) {
    const searchValue = props.searchText || "";

    const productTitle = product.title || "";

    const productCategory = product.category || "";

    const matchesSearch = productTitle
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesCategory =
      props.selectedCategory === "all" ||
      productCategory.toLowerCase() ===
        String(props.selectedCategory).toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // =========================
  // SORT PRODUCTS
  // =========================

  const sortedProducts = [...filteredProducts];

  if (props.sortOption === "low") {
    sortedProducts.sort(function (a, b) {
      return Number(a.price) - Number(b.price);
    });
  }

  if (props.sortOption === "high") {
    sortedProducts.sort(function (a, b) {
      return Number(b.price) - Number(a.price);
    });
  }

  if (props.sortOption === "rating") {
    sortedProducts.sort(function (a, b) {
      return Number(b.rating) - Number(a.rating);
    });
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="products" id="products">
        <div className="section-title">
          <p>Our Collection</p>

          <h2>Featured Products</h2>
        </div>

        <div className="product-list">
          {Array.from({ length: 8 }).map(function (_, index) {
            return (
              <div className="product-skeleton" key={index}>
                <div className="skeleton-image"></div>

                <div className="skeleton-line large"></div>

                <div className="skeleton-line"></div>

                <div className="skeleton-line small"></div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <section className="products" id="products">
        <div className="message-box error-box">
          <div className="message-icon">!</div>

          <h3>Something went wrong</h3>

          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="products" id="products">
      {/* =========================
          TITLE
          ========================= */}

      <div className="section-title">
        <p>Our Collection</p>

        <h2>Featured Products</h2>
      </div>

      {/* =========================
          FILTERS
          ========================= */}

      <div className="filter-box">
        {/* CATEGORY */}

        <select value={props.selectedCategory} onChange={handleCategorySelect}>
          <option value="all">All Categories</option>

          <option value="beauty">Beauty</option>

          <option value="fragrances">Fragrances</option>

          <option value="furniture">Furniture</option>

          <option value="groceries">Groceries</option>

          <option value="laptops">Laptops</option>

          <option value="smartphones">Smartphones</option>

          <option value="tablets">Tablets</option>

          <option value="mens-shoes">Men's Shoes</option>

          <option value="womens-shoes">Women's Shoes</option>
        </select>

        {/* SORT */}

        <select value={props.sortOption} onChange={props.handleSortChange}>
          <option value="default">Sort By</option>

          <option value="rating">Highest Rated</option>

          <option value="low">Price: Low to High</option>

          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* =========================
          RESULT COUNT
          ========================= */}

      <div className="product-result-info">
        <p>
          Showing <strong>{sortedProducts.length}</strong> products
        </p>
      </div>

      {/* =========================
          EMPTY
          ========================= */}

      {sortedProducts.length === 0 ? (
        <div className="message-box empty-box">
          <div className="message-icon">🔍</div>

          <h3>No products found</h3>

          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="product-list">
          {sortedProducts.map(function (product) {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.thumbnail}
                category={product.category}
                name={product.title}
                rating={product.rating}
                price={product.price}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Products;
