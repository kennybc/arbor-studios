import "./index.css";
import Page from "@/components/Page";
import TarotCard from "@/components/TarotCard";
import { useEffect, useRef } from "react";

const Home = () => {
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[] | null[]>([]);

  const convergeDeck = () => {
    if (!sourceRef.current) return;
    const sourcePos = sourceRef.current.getBoundingClientRect();
    cardRefs.current.forEach((cardRef, i) => {
      if (cardRef) {
        const cardPos = cardRef.getBoundingClientRect();
        const distX = sourcePos.x - cardPos.x;
        const distY = sourcePos.y - cardPos.y;
        cardRef.style.transitionDelay = `${i * 50}ms`;
        cardRef.style.transform = `translate(${distX}px, ${distY}px) rotate(${
          (i - 3) * 2
        }deg)`;
        console.log(distX);
        console.log(distY);
      }
    });
  };

  useEffect(() => {
    console.log(sourceRef.current?.getBoundingClientRect().x);
    console.log(sourceRef.current?.getBoundingClientRect().y);
    console.log(cardRefs);
  }, []);

  return (
    <Page>
      <button onClick={convergeDeck}>Toggle Deck</button>
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
