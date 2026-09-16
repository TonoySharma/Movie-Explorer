import Hero from '../components/Hero'

function Home({ featured, onDetails }) {
  return <Hero featured={featured} onDetails={onDetails} />
}

export default Home