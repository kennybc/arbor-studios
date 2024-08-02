import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

import "./index.css";

const Layout = () => {
  return (
    <div className="Layout">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
