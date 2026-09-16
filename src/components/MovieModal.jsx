function stripHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .trim();
}

function formatYear(date) {
  return date ? new Date(date).getFullYear() : "TBA";
}

function MovieModal({ show, onClose }) {
  if (!show) return null;

  const image =
    show.image?.original ||
    show.image?.medium ||
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80";

  const rating = show.rating?.average
    ? show.rating.average.toFixed(1)
    : "N/A";

  const runtime = show.runtime || show.averageRuntime || 45;

  const summary =
    stripHtml(show.summary) ||
    "A story worth settling in for. Explore the full show details and discover your next favourite watch.";

  const officialPage = show.officialSite || show.url;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <section
        className="details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          className="close-button"
          type="button"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>

        {/* Movie Image */}
        <div className="modal-image">
          <img
            src={image}
            alt={`${show.name} backdrop`}
          />
        </div>

        {/* Movie Content */}
        <div className="modal-content">
          <div className="eyebrow">
            SHOW DETAILS / {show.type || "SERIES"}
          </div>

          <h2 id="modal-title">{show.name}</h2>

          {/* Meta Information */}
          <div className="modal-meta">
            <span className="rating">
              <span className="star" aria-hidden="true">
                ⭐
              </span>{" "}
              {rating}
            </span>

            <span>
              Released {formatYear(show.premiered)}
            </span>

            <span>{runtime} min</span>
          </div>

          {/* Summary */}
          <p>{summary}</p>

          {/* Genres */}
          {show.genres?.length > 0 && (
            <div className="genre-list">
              {show.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
          )}

          {/* Official Page */}
          {officialPage && (
            <a
              className="modal-link"
              href={officialPage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open official page{" "}
              <span aria-hidden="true">-&gt;</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

export default MovieModal;