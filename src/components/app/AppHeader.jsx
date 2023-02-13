import React from "react";
import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <>
      <header className="app__header">
        <Link to="/" className="logo">
          SVI.ZAJEDNO();
        </Link>
      </header>
    </>
  );
}

export default AppHeader;
