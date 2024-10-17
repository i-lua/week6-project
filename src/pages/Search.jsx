import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import bgimage from "./assets/movies.jpg";
import MenuBar from "../components/MenuBar";
import SearchBar from "../components/SearchBar";

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
      if (searchQTerm && searchQTerm.trim() !== "") {
        searchMovies(searchQTerm);
        setSearchTerm(searchQTerm);
      } else {
        setMovies([])
      }
    }, [searchQTerm])

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
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(term)}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setHasSearched(true);
        setDisplayedSearchTerm(term);
      } else {
        setMovies([]);
        setHasSearched(true);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setLoading(false);
  };

  const handleNavigateToSearch = () => {
    navigate('/Search')
    window.location.reload()
  }

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
              <button className="underline-current" onClick={handleNavigateToSearch}>
              Find Your Movie
            </button>
              <Link to="/">
                <button className="btn">Contact</button>
              </Link>
            </div>
            <MenuBar />
          </div>
        </div>

        <div className="title">
          <h1 className="main-title">BEST MOVIES</h1>
          <SearchBar 
          loading={loading}
          setLoading={setLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          />
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
                    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
                      <div className="movie-card_container">
                        <img
                          className="poster"
                          src={movie.Poster}
                          alt={movie.Title}
                        />
                        <p>{movie.Title}</p>
                        <p>({movie.Year})</p>
                      </div>
                    </Link>
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
