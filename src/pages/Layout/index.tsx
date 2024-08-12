import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Deck from "@/components/Deck";

import "./index.css";

const Layout = () => {
  return (
    <div className="Layout">
      <Header />
      <div className="Layout__wrapper">
        <Deck />
        <div className="Layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
