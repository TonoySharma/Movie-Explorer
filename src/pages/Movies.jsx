import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'

function Movies({ shows, query, submittedQuery, loading, error, onQueryChange, onSearch, onRetry, onDetails }) {
  const [currentPage, setCurrentPage] = useState(1)
  const showsPerPage = 12
  const totalPages = Math.ceil(shows.length / showsPerPage)
  const visibleShows = shows.slice((currentPage - 1) * showsPerPage, currentPage * showsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [submittedQuery, shows.length])

  return <section className="catalogue-section" id="catalogue"><div className="section-heading"><div><div className="eyebrow">THE COLLECTION</div><h2>Find your next<br /><em>favourite.</em></h2></div><p>Browse the latest and greatest<br className="desktop-only" /> stories from TVMaze.</p></div><SearchBar query={query} onQueryChange={onQueryChange} onSearch={onSearch} /><div className="result-row"><span>{submittedQuery ? `Search results for “${submittedQuery}”` : 'Popular right now'}</span><span className="result-count">{shows.length ? `${shows.length} titles` : ''}</span></div>{loading && <div className="state-message"><span className="loader"></span> Curating your watchlist...</div>}{error && <div className="state-message error-state">{error} <button type="button" onClick={onRetry}>Try again</button></div>}{!loading && !error && !shows.length && <div className="state-message">No shows found. Try another title.</div>}<div className="movie-grid">{visibleShows.map((show) => <MovieCard key={show.id} show={show} onDetails={onDetails} />)}</div>{!loading && !error && totalPages > 1 && <nav className="pagination" aria-label="Movie pages"><button type="button" className="page-arrow" onClick={() => setCurrentPage((page) => page - 1)} disabled={currentPage === 1}>Previous</button><div className="page-numbers">{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} className={page === currentPage ? 'page-number active' : 'page-number'} onClick={() => setCurrentPage(page)} aria-label={`Go to page ${page}`} aria-current={page === currentPage ? 'page' : undefined}>{page}</button>)}</div><button type="button" className="page-arrow" onClick={() => setCurrentPage((page) => page + 1)} disabled={currentPage === totalPages}>Next</button></nav>}</section>
}

export default Movies