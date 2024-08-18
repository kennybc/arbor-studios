import { Link } from "react-router-dom";

import "./index.css";

function Header() {
  return (
    <div className="Header">
      <div className="Header__content">
        <Link to="/">
          <img
            className="Header__logo"
            src={new URL(`../../assets/logo.png`, import.meta.url).href}
          />
        </Link>
        arbor studios
      </div>
    </div>
  );
}

export default Header;
