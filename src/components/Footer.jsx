function Footer() {
    return (
        <footer id="about">
            <div className="footer-main">
                <div className="footer-intro">
                    <a className="footer-brand" href="#top" aria-label="Back to Movie Explorer home"><span className="brand-mark">M</span><strong>Movie<span className="brand-accent">Explorer</span></strong></a>
                    <p>Stories worth staying up for, curated for your next great watch.</p>
                </div>
                <div className="footer-links">
                    <span className="footer-label">Explore</span>
                    <a href="#catalogue">Catalogue</a>
                    <a href="#top">Featured</a>
                </div>
                <div className="footer-links">
                    <span className="footer-label">Connect</span>
                    <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">TVMaze</a>
                    <a href="#about">About us</a>
                </div>
            </div>
            <div className="footer-bottom"><span>© 2026 Movie Explorer</span><span>Powered by TVMaze API</span><a href="#top" className="back-to-top">Back to top <span aria-hidden="true">↑</span></a></div>
        </footer>
    )
}

export default Footer
