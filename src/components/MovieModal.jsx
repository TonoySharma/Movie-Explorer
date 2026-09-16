function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim()
}

function formatYear(date) {
  return date ? new Date(date).getFullYear() : 'TBA'
}

function MovieModal({ show, onClose }) {
  if (!show) return null
  const image = show.image?.original || show.image?.medium || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80'
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="details-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="close-button" type="button" onClick={onClose} aria-label="Close details">x</button><div className="modal-image"><img src={image} alt={`${show.name} backdrop`} /></div><div className="modal-content"><div className="eyebrow">SHOW DETAILS / {show.type || 'SERIES'}</div><h2 id="modal-title">{show.name}</h2><div className="modal-meta"><span className="rating"><span className="star">*</span> {show.rating?.average ? show.rating.average.toFixed(1) : 'N/A'}</span><span>Released {formatYear(show.premiered)}</span><span>{show.runtime || show.averageRuntime || 45} min</span></div><p>{stripHtml(show.summary) || 'A story worth settling in for. Explore the full show details and discover your next favourite watch.'}</p><div className="genre-list">{show.genres?.map((genre) => <span key={genre}>{genre}</span>)}</div><a className="modal-link" href={show.officialSite || show.url} target="_blank" rel="noreferrer">Open official page <span aria-hidden="true">-&gt;</span></a></div></section></div>
}

export default MovieModal