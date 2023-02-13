import Header from "../components/home/Header";
import UIfragment from "../components/home/UIfragment";
import Hero from "../components/home/Hero";
import MainSection from "../components/home/Main";
import Footer from "../components/home/Footer";
import Nav from "../components/home/Nav";
import SixCaps from "../assets/fonts/SixCaps-Regular.ttf";

import { useState } from "react";
import { useInView } from "react-intersection-observer";

function Home() {
  const [toggleNav, setToggleNav] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  return (
    <>
      <link rel="preload" href={SixCaps} as="font" type="font/ttf" />
      <Nav toggleNav={toggleNav} setToggleNav={setToggleNav} />
      <Header toggleNav={toggleNav} setToggleNav={setToggleNav} />
      <UIfragment toggleNav={toggleNav} inView={inView} />
      <UIfragment toggleNav={toggleNav} inView={inView} />
      <Hero />
      <MainSection />
      <Footer ref={ref} />
    </>
  );
}

export default Home;
