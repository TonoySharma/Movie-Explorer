function formatYear(date) {
  return date ? new Date(date).getFullYear() : "TBA";
}

function Rating({ score }) {
  return (
    <span className="rating">
      <span className="star" aria-hidden="true">
        ⭐
      </span>{" "}
      {score ? score.toFixed(1) : "N/A"}
    </span>
  );
}

function MovieCard({ show, onDetails }) {
  const image =
    show.image?.medium ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80";

  const rating = show.rating?.average
    ? show.rating.average.toFixed(1)
    : "N/A";

  const year = formatYear(show.premiered);

  const genre = show.genres?.[0] || "Drama";

  const type = show.type || "Series";

  const handleDetails = () => {
    if (onDetails) {
      onDetails(show);
    }
  };

  return (
    <article className="movie-card">
      {/* Poster */}
      <button
        className="poster-button"
        type="button"
        onClick={handleDetails}
        aria-label={`View details for ${show.name}`}
      >
        <img
          src={image}
          alt={`${show.name} poster`}
          loading="lazy"
        />

        {/* Hover Overlay */}
        <span className="poster-overlay">
          <span>View details</span>
          <b aria-hidden="true">-&gt;</b>
        </span>

        {/* Rating Badge */}
        <span className="card-rating">
          <span className="star" aria-hidden="true">
            ⭐
          </span>{" "}
          {rating}
        </span>
      </button>

      {/* Card Content */}
      <div className="card-copy">
        <div className="card-heading">
          <h3 title={show.name}>{show.name}</h3>

          <span className="year">{year}</span>
        </div>

        {/* Movie Meta */}
        <div className="card-meta">
          <Rating score={show.rating?.average} />

          <span>{genre}</span>

          <span>{type}</span>
        </div>

        {/* Details Button */}
        <button
          className="details-link"
          type="button"
          onClick={handleDetails}
        >
          See details{" "}
          <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
    </article>
  );
}

export default MovieCard;