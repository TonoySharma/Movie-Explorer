function Navbar({ onHome, onCatalogue }) {
    return (
        <header className="topbar">
            <a className="brand" href="#top" onClick={onHome ? (event) => { event.preventDefault(); onHome() } : undefined} aria-label="Movie Explorer home">
                <span className="brand-mark">M</span><span>Movie<span className="brand-accent">Explorer</span></span></a>
            <nav><a href="#catalogue" onClick={onCatalogue ? (event) => { event.preventDefault(); onCatalogue() } : undefined}>Catalogue</a><a href="#about">About</a></nav>
            <a className="nav-cta" href="#catalogue" onClick={onCatalogue ? (event) => { event.preventDefault(); onCatalogue() } : undefined}>
                Browse shows <span aria-hidden="true">-&gt;</span>
            </a>
        </header>
    )
}

export default Navbar