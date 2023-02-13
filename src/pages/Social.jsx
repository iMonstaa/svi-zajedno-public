import React from "react";
import AppHeader from "../components/app/AppHeader";
import AppNav from "../components/app/AppNav";

function Social({ children }) {
  return (
    <>
      <AppHeader />
      {children}
      <AppNav />
    </>
  );
}

export default Social;
