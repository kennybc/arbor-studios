import { useEffect, useRef } from "react";

import Page from "@/components/Page";
import TarotCard from "@/components/TarotCard";
import convergeDeck from "@/utils/deck";

import "./index.css";

const Home = () => {
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[] | null[]>([]);

  useEffect(() => {
    console.log(sourceRef.current?.getBoundingClientRect().x);
    console.log(sourceRef.current?.getBoundingClientRect().y);
    console.log(cardRefs);
  }, []);

  return (
    <Page>
      <button onClick={() => convergeDeck(sourceRef, cardRefs)}>
        Toggle Deck
      </button>
      <div className="Home__deck">
        <div className="Home__deck__source" ref={sourceRef}></div>
        {Array.from({ length: 6 }, (_, i) => {
          return (
            <TarotCard
              index={i + 1}
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
            />
          );
        })}
      </div>
    </Page>
  );
};

export default Home;
