import MenuCircle from "../../assets/images/menu.png";

function Header({ toggleNav, setToggleNav }) {
  return (
    <header className={`header ${toggleNav && "invert"}`}>
      <a href="#">
        <h1 className="logo">SVI.ZAJEDNO();</h1>
      </a>
      <div className="hamburger" onClick={() => setToggleNav((prev) => !prev)}>
        <img src={MenuCircle} className="hamburger__circle" />
        <div
          className={`hamburger__lines ${toggleNav && "hamburger__lines--on"}`}
        >
          <span className="hamburger__lines__line"></span>
          <span className="hamburger__lines__line"></span>
          <span className="hamburger__lines__line"></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
