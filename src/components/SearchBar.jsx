function SearchBar({ query, onQueryChange, onSearch }) {
  return <form className="search-form" onSubmit={(event) => { event.preventDefault(); onSearch() }}><span className="search-icon" aria-hidden="true">/</span><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search by title..." aria-label="Search by movie title" /><button type="submit">Search <span aria-hidden="true">-&gt;</span></button></form>
}

export default SearchBar