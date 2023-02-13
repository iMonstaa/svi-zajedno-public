import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/images/home.svg";
import dashboardIcon from "../../assets/images/dashboard.svg";
import profileIcon from "../../assets/images/profile.svg";
function AppNav() {
  return (
    <div className="app__nav">
      <Link to="/app" className="app__nav__home">
        <img src={homeIcon} alt="home" />
      </Link>
      <div className="app__nav__container">
        <Link to="/app/dashboard" className="app__nav__side">
          <span>INFO</span>
          <img src={dashboardIcon} style={{ height: "30px" }} alt="" />
        </Link>
        <Link to="/app/profile" className="app__nav__side">
          <img src={profileIcon} style={{ height: "30px" }} alt="" />
          <span>PROFIL</span>
        </Link>
      </div>
    </div>
  );
}

export default AppNav;
