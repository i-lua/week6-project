import React from "react";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const navigate = useNavigate();

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
    <div className="menu">
      <button className="btn__menu" onClick={openMenu}>
        <i className="fa fa-bars"></i>
      </button>
      <div className="menu__backdrop">
        <button className="btn__menu btn__menu--close" onClick={closeMenu}>
          <i className="fa fa-times"></i>
        </button>
        <ul className="menu__links">
          <li className="menu__list">
            <button className="menu__link" onClick={() => handleNavigate("/")}>
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
            <button className="menu__link" onClick={() => handleNavigate("/")}>
              Contact
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
