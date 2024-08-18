import { useContext } from "react";

import DeckContext from "./DeckContext";
import { locations } from "./DeckRouter";
import TarotCard from "./TarotCard";

import "./index.css";

const Deck = () => {
  const { cardRefs, sourceRef } = useContext(DeckContext);

  const setSourceRef = (node: HTMLDivElement) => {
    sourceRef.current = node;
  };

  const addCardRef = (node: HTMLDivElement) => {
    if (cardRefs.current.length == 6) {
      return;
    }
    cardRefs.current.push(node);
  };

  return (
    <div className="Deck">
      <div className="Deck__source" ref={setSourceRef}></div>
      <div className="Deck__cards">
        {Array.from({ length: locations.length }, (_, i) => {
          return (
            <TarotCard
              index={i + 1}
              key={i}
              ref={addCardRef}
              to={locations[i]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Deck;
