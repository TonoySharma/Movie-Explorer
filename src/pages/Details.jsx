function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim()
}

function formatYear(date) {
  return date ? new Date(date).getFullYear() : 'TBA'
}

function Details({ show, onBack }) {
  const image = show.image?.original || show.image?.medium || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85'
  return <section className="details-page"><button className="back-link" type="button" onClick={onBack}><span aria-hidden="true">&lt;-</span> Back to catalogue</button><div className="details-layout"><div className="details-poster"><img src={image} alt={`${show.name} poster`} /></div><div className="details-copy"><div className="eyebrow">FULL SHOW DETAILS / {show.type || 'SERIES'}</div><h1>{show.name}</h1><div className="details-stats"><span className="rating"><span className="star">*</span> {show.rating?.average ? show.rating.average.toFixed(1) : 'N/A'}</span><span>Released {formatYear(show.premiered)}</span><span>{show.runtime || show.averageRuntime || 45} min</span></div><p>{stripHtml(show.summary) || 'A story worth settling in for. Explore the full show details and discover your next favourite watch.'}</p><div className="genre-list">{show.genres?.map((genre) => <span key={genre}>{genre}</span>)}</div><a className="details-external" href={show.officialSite || show.url} target="_blank" rel="noreferrer">Open official page <span aria-hidden="true">-&gt;</span></a></div></div></section>
}

export default Details