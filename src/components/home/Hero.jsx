import React from "react";
import { useEffect, useRef } from "react";
import bag2 from "../../assets/images/hero/plastic-bag-2.webp";
import bag from "../../assets/images/hero/plastic-bag.webp";
import bottle from "../../assets/images/hero/glass-bottle.webp";
import cardboard from "../../assets/images/hero/cardboard.webp";
import can from "../../assets/images/hero/crushed-can.webp";
import paper from "../../assets/images/hero/paper.webp";
import toothbrush from "../../assets/images/hero/toothbrush.webp";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const heroImages = document.querySelectorAll(".hero__floating");
      const heroStretch = document.querySelectorAll(
        ".hero__part__text--stretch"
      );
      const heroText = document.querySelectorAll(".hero__part");

      const textChange = (dir) => {
        if (dir === "forw") {
          heroText[0].classList.add("hero__part--end");
          heroText[1].classList.remove("hero__part--off");
        } else if (dir === "back") {
          heroText[0].classList.remove("hero__part--end");
          heroText[1].classList.add("hero__part--off");
        } else if (dir === "end") {
          heroText[1].classList.add("hero__part--end");
        } else if (dir === "backend") {
          heroText[1].classList.remove("hero__part--end");
        }
      };

      if (heroRef.current) {
        const { clientHeight, scrollHeight } = heroRef.current;
        const scrollPosition = window.scrollY + window.innerHeight;
        const percentage = (scrollPosition / scrollHeight) * 100;

        if (percentage < 35) {
          heroImages.forEach((element) => {
            element.classList.remove("hero__floating--on");
          });
        }
        if (percentage < 45 && percentage > 35) {
          heroImages.forEach((element) => {
            element.classList.remove("hero__floating--on");
          });
          heroImages[2].classList.add("hero__floating--on");
        }
        if (percentage < 55 && percentage > 45) {
          heroImages.forEach((element) => {
            element.classList.remove("hero__floating--on");
          });
          heroImages[2].classList.add("hero__floating--on");
          heroImages[6].classList.add("hero__floating--on");
          heroStretch[0].classList.remove("hero__part__text--stretched");
          heroStretch[1].classList.remove("hero__part__text--stretched");
        }
        if (percentage < 65 && percentage > 55) {
          heroImages.forEach((element) => {
            element.classList.remove("hero__floating--on");
          });
          heroImages[2].classList.add("hero__floating--on");
          heroImages[4].classList.add("hero__floating--on");
          heroImages[6].classList.add("hero__floating--on");
          heroStretch[0].classList.add("hero__part__text--stretched");
          heroStretch[1].classList.add("hero__part__text--stretched");
        }
        if (percentage < 75 && percentage > 65) {
          heroImages.forEach((element) => {
            element.classList.add("hero__floating--on");
          });
          heroImages[0].classList.remove("hero__floating--on");
          heroImages[3].classList.remove("hero__floating--on");
          heroImages[5].classList.remove("hero__floating--on");
          textChange("back");
        }
        if (percentage < 85 && percentage > 75) {
          heroImages.forEach((element) => {
            element.classList.add("hero__floating--on");
          });
          heroImages[3].classList.remove("hero__floating--on");
          heroImages[5].classList.remove("hero__floating--on");
          heroStretch[2].classList.remove("hero__part__text--stretched");
          heroStretch[3].classList.remove("hero__part__text--stretched");
          textChange("forw");
        }
        if (percentage < 95 && percentage > 85) {
          heroImages.forEach((element) => {
            element.classList.add("hero__floating--on");
          });
          heroStretch[2].classList.add("hero__part__text--stretched");
          heroStretch[3].classList.add("hero__part__text--stretched");
        }
        if (percentage < 105 && percentage > 95) {
          heroImages.forEach((element) => {
            element.classList.add("hero__floating--on");
          });
          textChange("backend");
        }
        if (percentage > 105) {
          heroImages.forEach((element) => {
            element.classList.add("hero__floating--end");
          });
          textChange("forw");
          textChange("end");
        }
        if (percentage < 105) {
          heroImages.forEach((element) => {
            element.classList.remove("hero__floating--end");
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [heroRef]);

  return (
    <section className="hero" id="start" ref={heroRef}>
      <img
        className="hero__floating hero__floating--off"
        src={paper}
        alt="paper"
      />
      <img
        className="hero__floating hero__floating--off"
        src={bag2}
        alt="bag"
      />

      <div className="hero__part">
        <p className="hero__part__text">
          SVAKI KOMAD JE
          <span className="hero__part__text--stretch"> VAŽAN...</span>
        </p>
        <p className="hero__part__text">
          PA ČAK I<span className="hero__part__text--stretch"> NAJMANJI</span>
        </p>
      </div>
      <div className="hero__part hero__part--off">
        <p className="hero__part__text">
          JER<span className="hero__part__text--stretch"> JEDAN </span>KOMAD...
        </p>
        <p className="hero__part__text">
          MOŽE DA SE PRETVORI U{" "}
          <span className="hero__part__text--stretch">HAOS</span>
        </p>
      </div>
      <img
        className="hero__floating hero__floating--off"
        src={cardboard}
        alt="cardboard"
      />
      <img className="hero__floating hero__floating--off" src={can} alt="can" />
      <img
        className="hero__floating hero__floating--off"
        src={bottle}
        alt="bottle"
      />
      <img className="hero__floating hero__floating--off" src={bag} alt="bag" />
      <img
        className="hero__floating hero__floating--off"
        src={toothbrush}
        alt="toothbrush"
      />
    </section>
  );
}

export default Hero;
