import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DeckContext, useDeck } from "@/utils/deck";
import { useMounted } from "@/utils/misc";
import TarotCard from "./TarotCard";

import "./index.css";

const locations = [
  "/about",
  "/metaphysics",
  "/offerings",
  "/system",
  "/lineage",
  "/contact",
];
const loc2id = (loc: string) => locations.indexOf(loc);

const Deck = () => {
  const location = useLocation();

  const mounted = useMounted();
  const [nextRenderStill, setNextRenderStill] = useState(false);
  const { cardRefs, sourceRef, distances } = useContext(DeckContext);
  const { spreadDeck, convergeDeck } = useDeck();

  const setSourceRef = (node: HTMLDivElement) => {
    sourceRef.current = node;
  };

  const addCardRef = (node: HTMLDivElement) => {
    if (cardRefs.current.length == 6) {
      return;
    }
    cardRefs.current.push(node);
  };

  useEffect(() => {
    if (!mounted) {
      setNextRenderStill(true);
    }
  });

  useEffect(() => {
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
  }, [location.pathname, distances]);

  return (
    <div className="Deck">
      <div className="Deck__source" ref={setSourceRef}></div>
      {Array.from({ length: locations.length }, (_, i) => {
        return (
          <TarotCard index={i + 1} key={i} ref={addCardRef} to={locations[i]} />
        );
      })}
    </div>
  );
};

export default Deck;
