import "./index.css";

function Header() {
  return (
    <div className="Header">
      <div className="Header__logo">arbor studios</div>
      <div className="Header__menu">
        <li className="Header__menu__item">philosophy</li>
        <li className="Header__menu__item">services</li>
        <li className="Header__menu__item">portfolio</li>
        <li className="Header__menu__item">products</li>
      </div>
    </div>
  );
}

export default Header;
