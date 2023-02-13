import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Nav({ toggleNav, setToggleNav }) {
  useEffect(() => {
    const menu = document.querySelector(".nav");
    const menuItem = document.querySelectorAll(".nav__items__item");

    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      menuItem.forEach((item, index) => {
        item.addEventListener("mouseover", () => {
          menu.dataset.activeIndex = index;
        });
      });
    }
  });

  return (
    <nav className={`nav ${toggleNav && "nav--on"}`}>
      <div className="nav__items" onClick={() => setToggleNav((prev) => !prev)}>
        <div className="nav__items__item">
          <a href="#start">
            POČETN<span className="lastletter">A</span>
          </a>
        </div>
        <div className="nav__items__item">
          <a href="#how">INFORMACIJE</a>
        </div>
        <div className="nav__items__item">
          <Link to="/app">
            APLIKACIJ<span className="lastletter">A</span>
          </Link>
        </div>
      </div>
      <div className="nav__pattern"></div>
      <div className="nav__background"></div>
    </nav>
  );
}

export default Nav;
