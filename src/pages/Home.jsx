import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import homeMovie from './assets/BMSLogo.webp'
import MenuBar from "../components/MenuBar";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm && searchTerm.trim() !== "") {
      setLoading(true);
      navigate(`/Search?query=${encodeURIComponent(searchTerm)}`, {
        replace: false
      });
    }
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
     <MenuBar />
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
