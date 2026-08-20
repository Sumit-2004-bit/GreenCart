function Categories({ selectedCategory, handleCategoryChange }) {
  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "laptops",
    "smartphones",
    "tablets",
    "mens-shoes",
    "womens-shoes",
  ];

  // =========================
  // FORMAT CATEGORY NAME
  // =========================

  function formatCategory(category) {
    return category.replace(/-/g, " ").replace(/\b\w/g, function (letter) {
      return letter.toUpperCase();
    });
  }

  // =========================
  // HANDLE CATEGORY CLICK
  // =========================

  function selectCategory(category) {
    // Change selected category
    handleCategoryChange(category);

    // Scroll to products
    setTimeout(function () {
      const productsSection = document.getElementById("products");

      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  }

  return (
    <section className="categories" id="categories">
      {/* =========================
          SECTION TITLE
          ========================= */}

      <div className="section-title">
        <p>Browse</p>

        <h2>Shop by Category</h2>
      </div>

      {/* =========================
          CATEGORY BUTTONS
          ========================= */}

      <div className="category-list">
        {/* ALL PRODUCTS */}

        <button
          type="button"
          className={selectedCategory === "all" ? "active-category" : ""}
          onClick={function () {
            selectCategory("all");
          }}
        >
          All Products
        </button>

        {/* CATEGORIES */}

        {categories.map(function (category) {
          return (
            <button
              type="button"
              key={category}
              className={selectedCategory === category ? "active-category" : ""}
              onClick={function () {
                selectCategory(category);
              }}
            >
              {formatCategory(category)}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;
