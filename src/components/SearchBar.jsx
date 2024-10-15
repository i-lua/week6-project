import React from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ loading, setLoading, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      setLoading(true);
      navigate(`/Search?query=${encodeURIComponent(searchTerm)}`, {
        replace: true,
      });
    }
  };
  return (
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
  );
};

export default SearchBar;
