import React from "react";
import ScrollIndicator from "../../assets/images/SCROLL.svg";

function UIfragment({ toggleNav, inView }) {
  return (
    //prettier-ignore
    <span className={`uifragment ${(toggleNav || inView) ? "invert" : ""}`}>
      <img src={ScrollIndicator} />
      <span className="uifragment__line"></span>
    </span>
  );
}

export default UIfragment;
