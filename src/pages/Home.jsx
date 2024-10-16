import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import homeMovie from './assets/BMSLogo.webp'

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm && searchTerm.trim() !== "") {
      setLoading(true);
      navigate(`/Search?query=${encodeURIComponent(searchTerm)}`, {
        replace: false,
      });
    }
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

  return (
    <>
      <div className="header">
        <div className="header-container">
          <i className="fa fa-video-camera">
            <span className="black">BMS</span>
          </i>{" "}
          <div className="header-options">
            <span className="underline-current">
              Home
            </span>
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


      <div className="body">
        <div className="body-container">
          <h1 className="main-title">
          Find the film that ignites your passion. One search away, infinite
            adventures.{" "}
          </h1>
          <h2 className="main-title subtitle">SEARCH FOR YOUR MOVIE WITH <span className="green">BMS</span></h2>
          <SearchBar
            loading={loading}
            setLoading={setLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          <img className="home-background" src={homeMovie} alt="Home Movie" />
        </div>
      </div>
    </>
  );
};

export default Home;
