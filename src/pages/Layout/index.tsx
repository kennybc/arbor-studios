import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

import "./index.css";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
