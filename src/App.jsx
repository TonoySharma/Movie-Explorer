import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Details from './pages/Details'
import './App.css'

const curatedMovies = [
  { id: 'bn-pather-panchali', name: 'Pather Panchali', language: 'Bengali', premiered: '1955-08-26', rating: { average: 9.0 }, genres: ['Drama'], type: 'Movie', summary: 'A timeless Bengali coming-of-age story following a family and the small wonders of village life.', image: { medium: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85' } },
  { id: 'bn-bela-sheshe', name: 'Bela Sheshe', language: 'Bengali', premiered: '2015-05-01', rating: { average: 8.2 }, genres: ['Drama'], type: 'Movie', summary: 'A warm Bengali family drama about love, memory and a marriage that has lasted a lifetime.', image: { medium: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=85' } },
  { id: 'bn-chokher-bali', name: 'Chokher Bali', language: 'Bengali', premiered: '2003-08-09', rating: { average: 8.1 }, genres: ['Romance'], type: 'Movie', summary: 'An evocative period romance inspired by Rabindranath Tagore.', image: { medium: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=85' } },
  { id: 'ta-vikram', name: 'Vikram', language: 'Tamil', premiered: '2022-06-03', rating: { average: 8.3 }, genres: ['Action'], type: 'Movie', summary: 'A retired agent returns to the shadows when a dangerous drug syndicate threatens his city.', image: { medium: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=700&q=85' } },
  { id: 'ta-kaithi', name: 'Kaithi', language: 'Tamil', premiered: '2019-10-25', rating: { average: 8.4 }, genres: ['Thriller'], type: 'Movie', summary: 'A prisoner races through one unforgettable night to meet his daughter for the first time.', image: { medium: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85' } },
  { id: 'ta-96', name: '96', language: 'Tamil', premiered: '2018-10-04', rating: { average: 8.5 }, genres: ['Romance'], type: 'Movie', summary: 'Two school sweethearts meet again years later and revisit the memories they left behind.', image: { medium: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=700&q=85' } },
  { id: 'hi-3-idiots', name: '3 Idiots', language: 'Hindi', premiered: '2009-12-25', rating: { average: 8.4 }, genres: ['Comedy'], type: 'Movie', summary: 'Three friends navigate college, pressure and the courage to follow their own path.', image: { medium: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=700&q=85' } },
  { id: 'hi-dangal', name: 'Dangal', language: 'Hindi', premiered: '2016-12-23', rating: { average: 8.3 }, genres: ['Sport'], type: 'Movie', summary: 'A determined father trains his daughters to become champions against every expectation.', image: { medium: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=85' } },
  { id: 'hi-andhadhun', name: 'Andhadhun', language: 'Hindi', premiered: '2018-10-05', rating: { average: 8.2 }, genres: ['Thriller'], type: 'Movie', summary: 'A pianist becomes entangled in a mystery where nothing is quite what it seems.', image: { medium: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=85' } },
  { id: 'en-inception', name: 'Inception', language: 'English', premiered: '2010-07-16', rating: { average: 8.8 }, genres: ['Sci-Fi'], type: 'Movie', summary: 'A skilled extractor enters the dreams of others for one impossible final job.', image: { medium: 'https://images.unsplash.com/photo-1440404653325-ab127d49cada?auto=format&fit=crop&w=700&q=85' } },
  { id: 'en-interstellar', name: 'Interstellar', language: 'English', premiered: '2014-11-07', rating: { average: 8.7 }, genres: ['Sci-Fi'], type: 'Movie', summary: 'Explorers travel beyond the stars in search of a future for humanity.', image: { medium: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=85' } },
  { id: 'en-parasite', name: 'Parasite', language: 'English', premiered: '2019-05-30', rating: { average: 8.5 }, genres: ['Thriller'], type: 'Movie', summary: 'Two families become intertwined in a sharp, suspenseful story about class and ambition.', image: { medium: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85' } },
]

const additionalMovieGroups = [
  { language: 'Bengali', titles: ['Aparajito', 'Apur Sansar', 'Jalsaghar', 'Nayak', 'Mahanagar', 'Meghe Dhaka Tara', 'Harano Sur', 'Saptapadi', 'Ghare Baire', 'Autograph', 'Praktan', 'Bhooter Bhabishyat'] },
  { language: 'Tamil', titles: ['Roja', 'Bombay', 'Anbe Sivam', 'Super Deluxe', 'Pariyerum Perumal', 'Jai Bhim', 'Soorarai Pottru', 'Kaaka Kaaka', 'Ratsasan', 'Aruvi', 'Vada Chennai', 'Pudhupettai'] },
  { language: 'Hindi', titles: ['Lagaan', 'Swades', 'Rang De Basanti', 'Queen', 'Barfi!', 'Gully Boy', 'Masaan', 'Tumbbad', 'Article 15', 'Drishyam', 'Zindagi Na Milegi Dobara', 'Taare Zameen Par'] },
  { language: 'English', titles: ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 'The Matrix', 'Good Will Hunting', 'The Green Mile', 'Whiplash', 'The Prestige', 'Arrival', 'The Departed', 'The Truman Show'] },
]

const posterImages = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=700&q=85',
]

const additionalMovies = additionalMovieGroups.flatMap((group) => group.titles.map((name, index) => ({
  id: `${group.language.toLowerCase()}-${index}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  name,
  language: group.language,
  premiered: `${2000 + index}-01-01`,
  rating: { average: Number((7.7 + (index % 10) / 10).toFixed(1)) },
  genres: [index % 2 ? 'Drama' : 'Cinema'],
  type: 'Movie',
  summary: `A celebrated ${group.language} movie with memorable characters, striking moments and a story that stays with you.`,
  image: { medium: posterImages[index % posterImages.length] },
})))

const movieCatalogue = [...curatedMovies, ...additionalMovies]

function App() {
  const [shows, setShows] = useState([])
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [selectedShow, setSelectedShow] = useState(null)
  const [page, setPage] = useState('catalogue')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    const results = submittedQuery ? movieCatalogue.filter((movie) => movie.name.toLowerCase().includes(submittedQuery.toLowerCase())) : movieCatalogue
    setShows(results)
    setLoading(false)
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
