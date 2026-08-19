import heroImage from "../assets/hero.png";

function Hero() {
  function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-content">
        {/* BADGE */}

        <div className="hero-badge">
          <span></span>
          Fresh finds. Better shopping.
        </div>

        {/* SMALL TITLE */}

        <p className="eyebrow">Welcome to GreenCart</p>

        {/* MAIN HEADING */}

        <h1>
          Simple shopping.
          <span>Better choices.</span>
        </h1>

        {/* DESCRIPTION */}

        <p className="hero-text">
          Discover products you love, compare prices and build your perfect cart
          in one simple place.
        </p>

        {/* BUTTONS */}

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => scrollToSection("products")}
          >
            Explore Products
            <span>→</span>
          </button>

          <button
            className="secondary-btn"
            onClick={() => scrollToSection("categories")}
          >
            Browse Categories
          </button>
        </div>

        {/* HERO STATS */}

        <div className="hero-stats">
          <div>
            <strong>100+</strong>

            <span>Products</span>
          </div>

          <div>
            <strong>10+</strong>

            <span>Categories</span>
          </div>

          <div>
            <strong>Easy</strong>

            <span>Shopping</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
