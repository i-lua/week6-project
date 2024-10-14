import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import bgimage from "./assets/movies.jpg";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQTerm = searchParams.get("query");

  const apiKey = "5efc08a5";
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQTerm) {
      searchMovies(searchQTerm);
      setSearchTerm(searchQTerm)
    } else {
      setMovies([])
      setHasSearched(false)
    }
  }, [searchQTerm]);

  useEffect(() => {
    fetchSuggestions();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=avengers`
      );
      setMovies(response.data.Search.slice(0, 4));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const searchMovies = async (term) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          term
        )}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setHasSearched(true);
        setDisplayedSearchTerm(term);
      } else {
        setMovies([]);
        setHasSearched(true)
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (searchTerm) {
      searchMovies(searchTerm);
    }
  };

  // Scroll event handler to toggle back to top button visibility
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  // Function to scroll back to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle navigation in hamburger menu
  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  const openMenu = () => {
    document.body.classList += " menu--open";
  };

  const closeMenu = () => {
    document.body.classList.remove("menu--open");
  };

  // Skeleton loading component
  const Skeleton = () => (
    <div className="skeleton">
      <div className="skeleton-poster"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
    </div>
  );

  // Filter options
  const handleCombinedFilter = (e) => {
    const filterType = e.target.value;
    let sortedMovies = [...movies];

    if (filterType === "oldest") {
      sortedMovies.sort((a, b) => parseInt(a.Year, 10) - parseInt(b.Year, 10));
    } else if (filterType === "newest") {
      sortedMovies.sort((a, b) => parseInt(b.Year, 10) - parseInt(a.Year, 10));
    } else if (filterType === "asc") {
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filterType === "desc") {
      sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    setMovies(sortedMovies);
  };

  return (
    <>
      <div id="main">
        <img className="background" src={bgimage} alt="Movies background" />
        <div className="header">
          <div className="header-title">
            <i className="fa fa-video-camera"></i>
            <div className="header-options">
              <Link className="underline" to="/">
                Home
              </Link>
              <Link className="underline" to="/Search">
                Find Your Movie
              </Link>
              <Link to="/">
                <button className="btn">Contact</button>
              </Link>
            </div>

            <div className="menu">
              <button className="btn__menu" onClick={openMenu}>
                <i className="fa fa-bars"></i>
              </button>
              <div className="menu__backdrop">
                <button
                  className="btn__menu btn__menu--close"
                  onClick={closeMenu}
                >
                  <i className="fa fa-times"></i>
                </button>
                <ul className="menu__links">
                  <li className="menu__list">
                    <button
                      className="menu__link"
                      onClick={() => handleNavigate("/")}
                    >
                      Home
                    </button>
                  </li>
                  <li className="menu__list">
                    <button
                      className="menu__link"
                      onClick={() => handleNavigate("/Search")}
                    >
                      Find Your Movie
                    </button>
                  </li>
                  <li className="menu__list">
                    <button
                      className="menu__link"
                      onClick={() => handleNavigate("/")}
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="title">
          <h1 className="main-title">BEST MOVIES</h1>
          <div className="search">
            <input
              type="text"
              id="searchInput"
              placeholder="Search Movie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button id="searchBtn" onClick={handleSearch}>
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                <i className="fa fa-search"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      <div id="body">
        {loading ? (
          <div className="skeleton-container">
            {[1, 2, 3, 4].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="movies">
              <h2>
                {hasSearched ? (
                  <>
                    Search results for{" "}
                    <span style={{ color: "turquoise" }}>
                      '{displayedSearchTerm}'
                    </span>
                  </>
                ) : (
                  "MOVIES"
                )}
                <div className="filter-bar">
                  <select id="combinedFilter" onChange={handleCombinedFilter}>
                    <option value="">FILTER</option>
                    <option value="oldest">Oldest to Newest</option>
                    <option value="newest">Newest to Oldest</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </select>
                </div>
              </h2>

              <div className="results">
                {movies.map((movie) => (
                  <div className="movie" key={movie.imdbID}>
                    <div key={movie.imdbID} className="movie-card">
                      <div className="movie-card_container">
                        <img
                          className="poster"
                          src={movie.Poster}
                          alt={movie.Title}
                        />
                        <p>{movie.Title}</p>
                        <p>({movie.Year})</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <button
        className={`back-to-top ${showBackToTop ? "show" : ""}`}
        onClick={scrollToTop}
      >
        <i className="fa fa-arrow-up"></i>
      </button>
    </>
  );
};

export default Search;
