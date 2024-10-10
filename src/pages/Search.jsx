import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const apiKey = "5efc08a5";
  const navigate = useNavigate();

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
    document.body.classList += " menu--open"
  }

  const closeMenu = () => {
    document.body.classList.remove('menu--open')
  }

 


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
              <Link className="underline" to="/">
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
              <div className='menu__backdrop'>
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
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div id="body">
        {loading ? (
          <div id="spinner" className="spinner">
            <i className="fa fa-spinner fa-spin"></i>
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
