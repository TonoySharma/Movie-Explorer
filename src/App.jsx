import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Details from './pages/Details'
import './App.css'

const API_URL = 'https://api.tvmaze.com'

function App() {
  const [shows, setShows] = useState([])
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [selectedShow, setSelectedShow] = useState(null)
  const [page, setPage] = useState('catalogue')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    const endpoint = submittedQuery ? `${API_URL}/search/shows?q=${encodeURIComponent(submittedQuery)}` : `${API_URL}/shows`
    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load shows')
        return response.json()
      })
      .then((data) => setShows(submittedQuery ? data.map((item) => item.show) : data.slice(0, 60)))
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') setError('The catalogue is taking a pause. Check your connection and try again.')
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [submittedQuery])

  const featured = shows[0]
  const openDetails = (show) => {
    setSelectedShow(show)
    setPage('details')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const closeDetails = () => {
    setSelectedShow(null)
    setPage('catalogue')
  }

  return (
    <div className="app-shell">
      <Navbar onHome={page === 'details' ? closeDetails : undefined} onCatalogue={page === 'details' ? closeDetails : undefined} />

      <main id="top">
        {page === 'details' && selectedShow ? <Details show={selectedShow} onBack={closeDetails} /> : <><Home featured={featured} onDetails={openDetails} /><Movies shows={shows} query={query} submittedQuery={submittedQuery} loading={loading} error={error} onQueryChange={setQuery} onSearch={() => setSubmittedQuery(query.trim())} onRetry={() => setSubmittedQuery(submittedQuery)} onDetails={openDetails} /></>}
      </main>

      <Footer />
    </div>
  )
}

export default App
