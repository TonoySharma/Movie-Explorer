function Hero({ featured, onDetails, onCatalogue }) {
  const featureImage =
    featured?.image?.original ||
    featured?.image?.medium ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85";

  const featureTitle = featured?.name || "Your next story awaits";

  const handleCatalogueClick = (event) => {
    event.preventDefault();

    if (onCatalogue) {
      onCatalogue();
    }
  };

  const handleFeaturedClick = () => {
    if (featured && onDetails) {
      onDetails(featured);
    }
  };

  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <div className="eyebrow">YOUR NEXT GREAT WATCH</div>

        <h1>
          Stories that stay
          <br />
          <em>with you.</em>
        </h1>

        <p>
          Curated shows, unforgettable characters, and the perfect thing to
          watch tonight.
        </p>

        <a
          className="primary-button"
          href="#catalogue"
          onClick={handleCatalogueClick}
        >
          Explore the catalogue{" "}
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>

      <button
        className="hero-feature"
        type="button"
        onClick={handleFeaturedClick}
        disabled={!featured}
        aria-label={`View featured show ${featureTitle}`}
      >
        <img
          src={featureImage}
          alt={`${featureTitle} feature`}
        />

        <span className="feature-caption">
          <small>
            {featured ? "FEATURED TODAY" : "CURATED FOR YOU"}
          </small>

          <strong>{featureTitle}</strong>

          <span>
            {featured ? "See the story" : "Discover something new"}{" "}
            <b aria-hidden="true">-&gt;</b>
          </span>
        </span>
      </button>

      <div className="hero-stamp" aria-hidden="true">
        <span>01</span>
        <i></i>
        <span>04</span>
      </div>
    </section>
  );
}

export default Hero;