import { useState, useRef, ReactNode, useEffect } from "react";

import { DeckCoordType } from "./DeckTypes";
import DeckContext from "./DeckContext";
import debounce from "@/utils/debounce";

const DeckProvider = ({ children }: { children: ReactNode }) => {
  const [converged, setConverged] = useState(-1);
  const cardRefs = useRef<HTMLDivElement[]>(new Array());
  const contentRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const [distances, setDistances] = useState(new Array<DeckCoordType>());

  const calculatePos = (card: HTMLDivElement) => {
    const boundRect = card.getBoundingClientRect();
    if (card.style.transform) {
      var style = window.getComputedStyle(card);
      var matrix = new WebKitCSSMatrix(style.transform);
      return {
        x: boundRect.x - matrix.m41,
        y: boundRect.y - matrix.m42,
        height: boundRect.height,
        width: boundRect.width,
      };
    } else {
      return boundRect;
    }
  };

  // calculate how far each card needs to shift to reach deck source position
  const calculateDist = () => {
    // source position
    if (!sourceRef.current || !contentRef.current) return;

    // dynamically set source position (card ratio is 450/300) = 1.5
    sourceRef.current.style.top =
      -10 + (1.5 * cardRefs.current[0].offsetWidth) / 2 + "px";
    // dynamically set top padding of text content to account for card height
    contentRef.current.style.removeProperty("padding-top");
    contentRef.current.style.paddingTop =
      1.5 * cardRefs.current[0].offsetWidth + "px";

    const sourcePos = sourceRef.current.getBoundingClientRect();

    // calculate distance between each card position to source position
    let dist: DeckCoordType[] = [];
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardPos = calculatePos(card);
      const distX = sourcePos.x - (cardPos.x + cardPos.width / 2);
      const distY = sourcePos.y - (cardPos.y + cardPos.height / 2);
      dist[i] = { x: distX, y: distY };
    });

    // update context state to store calculated distances
    setDistances(dist);
  };

  // spread the cards out
  const spreadDeck = () => {
    setConverged(-1);

    cardRefs.current.forEach((card, i) => {
      if (card == null || card.style.transform == "") return;

      card.classList.add("animating");

      // transition cards to original location by removing transform
      card.style.transition = `transform 0.6s ease ${i * 50}ms`;
      card.style.removeProperty("transform");

      // finish animation; remove classes and handlers
      const spreadEventHandler = (e: TransitionEvent) => {
        if (e.target != card) return;
        card.classList.remove("animating");
        card.classList.remove("selected");
        card.removeEventListener("transitionend", spreadEventHandler);
      };
      card.addEventListener("transitionend", spreadEventHandler);
    });
  };

  // converge the cards to a source location with a given card on top
  const convergeDeck = (index: number, animate: boolean = true) => {
    if (converged != -1 && index != converged) return drawCard(index);

    setConverged(index);

    cardRefs.current.forEach((card, i) => {
      if (card == null) return;

      // add mid-animation class and converged class
      // add selected class to clicked card only if not already converged
      // 10px of flexibility
      if (animate) card.classList.add("animating");
      if (i == index) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }

      //console.log(`card ${i}: ${distances[i].x}, ${distances[i].y}`);

      // transition cards to source location
      if (animate) {
        card.style.transition = `transform 0.6s ease ${i * 50}ms`;
      } else {
        card.style.removeProperty("transition");
      }
      card.style.transform = `translate(${distances[i].x}px, ${distances[i].y}px)`;

      // finish animation; remove classes and handlers
      const convergeEventHandler = (e: TransitionEvent) => {
        if (e.target != card) return;
        card.classList.remove("animating");
        card.removeEventListener("transitionend", convergeEventHandler);
      };
      card.addEventListener("transitionend", convergeEventHandler);
    });
  };

  // when deck is already converged: draw a given card and place it on top
  const drawCard = (index: number) => {
    const prev = converged;

    setConverged(index);

    const card = cardRefs.current[index];
    card.classList.add("animating");
    card.classList.add("selected");
    card.classList.add("drawing");

    // finish animation; remove classes and handlers
    const drawEventHandler = () => {
      console.log("event");
      card.classList.remove("animating");
      card.classList.remove("drawing");

      cardRefs.current[prev].classList.remove("selected");
      card.classList.add("selected");

      card.removeEventListener("animationend", drawEventHandler);
    };
    card.addEventListener("animationend", drawEventHandler);
  };

  const dbCalcDist = debounce(() => {
    calculateDist();
  }, 200);

  useEffect(() => {
    calculateDist();
  }, [cardRefs, sourceRef, contentRef]);

  useEffect(() => {
    window.addEventListener("resize", dbCalcDist);
    return () => window.removeEventListener("resize", dbCalcDist);
  }, []);

  return (
    <DeckContext.Provider
      value={{
        converged,
        cardRefs,
        sourceRef,
        contentRef,
        distances,
        setConverged,
        calculateDist,
        convergeDeck,
        spreadDeck,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export default DeckProvider;
