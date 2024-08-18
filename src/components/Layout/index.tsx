import { ReactNode, useContext } from "react";

import Header from "@/components/Header";
import DeckContext from "../Deck/DeckContext";

import "./index.css";

const Layout = ({ children }: { children: ReactNode }) => {
  const { contentRef } = useContext(DeckContext);

  const setContentRef = (node: HTMLDivElement) => {
    contentRef.current = node;
  };

  return (
    <div className="Layout">
      <Header />
      <div className="Layout__wrapper">
        <div className="Layout__content" ref={setContentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
