function formatYear(date) {
  return date ? new Date(date).getFullYear() : 'TBA'
}

function Rating({ score }) {
  return <span className="rating"><span className="star">*</span> {score ? score.toFixed(1) : 'N/A'}</span>
}

function MovieCard({ show, onDetails }) {
  const image = show.image?.medium || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80'
  return (
    <article className="movie-card">
      <button className="poster-button" type="button" onClick={() => onDetails(show)} aria-label={`View details for ${show.name}`}>
        <img src={image} alt={`${show.name} poster`} /><span className="poster-overlay"><span>View details</span><b aria-hidden="true">-&gt;</b></span><span className="card-rating"><span className="star">*</span> {show.rating?.average ? show.rating.average.toFixed(1) : 'N/A'}</span>
      </button>
      <div className="card-copy"><div className="card-heading"><h3>{show.name}</h3><span className="year">{formatYear(show.premiered)}</span></div><div className="card-meta"><Rating score={show.rating?.average} /><span>{show.genres?.[0] || 'Drama'}</span><span>{show.type || 'Series'}</span></div><button className="details-link" type="button" onClick={() => onDetails(show)}>See details <span aria-hidden="true">-&gt;</span></button></div>
    </article>
  )
}

export default MovieCard