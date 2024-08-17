import "./index.css";

function Header() {
  return (
    <div className="Header">
      <img
        className="Header__logo"
        src={new URL(`../../assets/logo.png`, import.meta.url).href}
      />
    </div>
  );
}

export default Header;
