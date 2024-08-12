import {
  useState,
  createContext,
  useContext,
  RefObject,
  MutableRefObject,
} from "react";

export type DeckContextType = {
  cardRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  sourceRef: RefObject<HTMLDivElement>;
};

export const DeckContext = createContext({} as DeckContextType);

export const useDeck = () => {
  const [converged, setConverged] = useState<boolean>(false);
  const { cardRefs, sourceRef } = useContext(DeckContext);

  // spread the cards out
  const spreadDeck = () => {
    if (
      cardRefs.current == null ||
      cardRefs.current[cardRefs.current.length - 1]?.classList.contains(
        "animating"
      )
    ) {
      return;
    }

    setConverged(false);
    cardRefs.current.forEach((cardRef, i) => {
      if (cardRef) {
        if (cardRef.style.transform == "") {
          return;
        }

        cardRef.classList.add("animating");

        // transition cards to original location by removing transform
        cardRef.style.transitionDelay = `${i * 50}ms`;
        cardRef.style.removeProperty("transform");

        const spreadEventHandler = () => {
          cardRef.classList.remove("animating");
          cardRef.classList.remove("selected");
          cardRef.removeEventListener("transitionend", spreadEventHandler);
        };
        cardRef.addEventListener("transitionend", spreadEventHandler);
      }
    });
  };

  // converge the cards to a source location with a given card on top
  const convergeDeck = (index: number) => {
    console.log(cardRefs);

    // quit if refs don't exist yet or are still transitioning
    if (
      sourceRef.current == null ||
      cardRefs.current == null ||
      cardRefs.current[cardRefs.current.length - 1]?.classList.contains(
        "animating"
      )
    ) {
      return;
    }

    if (converged) {
      //return spreadDeck();
    }

    setConverged(true);
    const sourcePos = sourceRef.current.getBoundingClientRect();
    cardRefs.current.forEach((cardRef, i) => {
      if (cardRef) {
        const cardPos = cardRef.getBoundingClientRect();
        const distX = sourcePos.x - cardPos.x;
        const distY = sourcePos.y - (cardPos.y + cardPos.height / 2);

        // add mid-animation class and converged class
        // add selected class to clicked card only if not already converged
        // 10px of flexibility
        cardRef.classList.add("animating");
        console.log(`testing card ${i} against index ${index}`);
        if (i == index && Math.abs(distX) > 10) {
          cardRef.classList.add("selected");
        } else if (i != index) {
          cardRef.classList.remove("selected");
        }

        // transition cards to source location
        cardRef.style.transitionDelay = `${i * 50}ms`;
        cardRef.style.transform = `translate(${distX}px, ${distY}px)`;

        const convergeEventHandler = () => {
          cardRef.classList.remove("animating");
          cardRef.removeEventListener("transitionend", convergeEventHandler);
        };
        cardRef.addEventListener("transitionend", convergeEventHandler);
      }
    });
  };

  return { converged, convergeDeck, spreadDeck };
};
