import {
  useState,
  useRef,
  createContext,
  MutableRefObject,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import debounce from "./debounce";

/***************************
 *      DECK CONTEXT
 **************************/
type DeckCoordType = {
  x: number;
  y: number;
};

type DeckContextType = {
  converged: number;
  cardRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  sourceRef: MutableRefObject<HTMLDivElement | null>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  distances: Array<DeckCoordType>;
  setConverged: Dispatch<SetStateAction<number>>;
  calculateDist: () => void;
  convergeDeck: (index: number, animate: boolean) => void;
  spreadDeck: () => void;
};

export const DeckContext = createContext({} as DeckContextType);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
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
      180 + (1.5 * cardRefs.current[0].offsetWidth) / 2 + "px";
    // dynamically set top padding of text content to account for card height
    console.log(contentRef);
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
    cardRefs.current.forEach((card, i) => {
      if (card == null) return;

      setConverged(index);

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
