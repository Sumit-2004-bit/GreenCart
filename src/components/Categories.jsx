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

  function formatCategory(category) {
    return category.replace("-", " ").replace(/\b\w/g, function (letter) {
      return letter.toUpperCase();
    });
  }

  return (
    <section className="categories" id="categories">
      <div className="section-title">
        <p>Browse</p>

        <h2>Shop by Category</h2>
      </div>

      <div className="category-list">
        <button
          className={selectedCategory === "all" ? "active-category" : ""}
          onClick={() => handleCategoryChange("all")}
        >
          All Products
        </button>

        {categories.map(function (category) {
          return (
            <button
              key={category}
              className={selectedCategory === category ? "active-category" : ""}
              onClick={() => handleCategoryChange(category)}
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
