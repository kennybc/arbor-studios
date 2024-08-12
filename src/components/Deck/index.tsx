import { useContext } from "react";
import { Link } from "react-router-dom";

import { DeckContext } from "@/utils/deck";
import TarotCard from "./TarotCard";

import "./index.css";

const locations = [
  "/about",
  "/metaphysics",
  "/offerings",
  "system",
  "lineage",
  "contact",
];
//const loc2id = (loc: string) => locations.indexOf(loc);

const Deck = () => {
  const { cardRefs, sourceRef } = useContext(DeckContext);

  return (
    <div className="Deck">
      <div className="Deck__source" ref={sourceRef}></div>
      {Array.from({ length: 6 }, (_, i) => {
        return (
          <Link to={locations[i]} key={i}>
            <TarotCard
              index={i + 1}
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              /*onClick={() => {
            convergeDeck(i);
          }}*/
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Deck;
