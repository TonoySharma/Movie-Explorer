import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'

function Movies({ shows, query, submittedQuery, loading, error, onQueryChange, onSearch, onRetry, onDetails }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [language, setLanguage] = useState('All')
  const showsPerPage = 12
  const languages = ['All', 'Bengali', 'Tamil', 'Hindi', 'English']
  const filteredShows = language === 'All' ? shows : shows.filter((show) => show.language === language)
  const totalPages = Math.ceil(filteredShows.length / showsPerPage)
  const visibleShows = filteredShows.slice((currentPage - 1) * showsPerPage, currentPage * showsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [submittedQuery, shows.length, language])

  return <section className="catalogue-section" id="catalogue"><div className="section-heading"><div><div className="eyebrow">THE COLLECTION</div><h2>Find your next<br /><em>favourite.</em></h2></div><p>Browse Bengali, Tamil, Hindi<br className="desktop-only" /> and English stories.</p></div><SearchBar query={query} onQueryChange={onQueryChange} onSearch={onSearch} /><div className="language-tabs" role="tablist" aria-label="Filter by language">{languages.map((item) => <button type="button" key={item} className={item === language ? 'language-tab active' : 'language-tab'} onClick={() => setLanguage(item)} role="tab" aria-selected={item === language}>{item}</button>)}</div><div className="result-row"><span>{submittedQuery ? `Search results for “${submittedQuery}”` : `${language === 'All' ? 'Popular right now' : `${language} picks`}`}</span><span className="result-count">{filteredShows.length ? `${filteredShows.length} titles` : ''}</span></div>{loading && <div className="state-message"><span className="loader"></span> Curating your watchlist...</div>}{error && <div className="state-message error-state">{error} <button type="button" onClick={onRetry}>Try again</button></div>}{!loading && !error && !filteredShows.length && <div className="state-message">No shows found. Try another title.</div>}<div className="movie-grid">{visibleShows.map((show) => <MovieCard key={show.id} show={show} onDetails={onDetails} />)}</div>{!loading && !error && totalPages > 1 && <nav className="pagination" aria-label="Movie pages"><button type="button" className="page-arrow" onClick={() => setCurrentPage((page) => page - 1)} disabled={currentPage === 1}>Previous</button><div className="page-numbers">{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" key={page} className={page === currentPage ? 'page-number active' : 'page-number'} onClick={() => setCurrentPage(page)} aria-label={`Go to page ${page}`} aria-current={page === currentPage ? 'page' : undefined}>{page}</button>)}</div><button type="button" className="page-arrow" onClick={() => setCurrentPage((page) => page + 1)} disabled={currentPage === totalPages}>Next</button></nav>}</section>
}

export default Movies