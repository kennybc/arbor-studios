import { Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useContext, useState } from "react";

import { DeckContext } from "@/utils/deck";
import { useMounted } from "@/utils/misc";
import Layout from "@/components/Layout";
import Deck from "..";

export const locations = [
  "/about",
  "/metaphysics",
  "/offerings",
  "/system",
  "/lineage",
  "/contact",
];
const loc2id = (loc: string) => locations.indexOf(loc);

const DeckRouter = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const mounted = useMounted();
  const [nextRenderStill, setNextRenderStill] = useState(false);
  const { distances, convergeDeck, spreadDeck } = useContext(DeckContext);

  const pathChangeHandler = () => {
    if (!distances || distances.length != 6) {
      return;
    }
    let animate = true;
    if (nextRenderStill) {
      setNextRenderStill(false);
      animate = false;
    }
    if (location.pathname == "/") {
      spreadDeck();
    } else {
      const index = loc2id(location.pathname);
      convergeDeck(index, animate);
    }
  };

  useEffect(() => {
    if (!mounted) {
      setNextRenderStill(true);
    }
  });

  useEffect(() => {
    pathChangeHandler();
  }, [distances]);

  return (
    <>
      <Layout>
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={pathChangeHandler}
        >
          <Routes location={location} key={location.pathname}>
            {children}
          </Routes>
        </AnimatePresence>
      </Layout>
      <Deck />
    </>
  );
};

export default DeckRouter;
