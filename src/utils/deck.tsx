import {
  useState,
  useRef,
  createContext,
  useContext,
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
  converged: boolean;
  cardRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  sourceRef: MutableRefObject<HTMLDivElement | null>;
  distances: Array<DeckCoordType>;
  setConverged: Dispatch<SetStateAction<boolean>>;
  calculateDist: () => void;
};

export const DeckContext = createContext({} as DeckContextType);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
  const [converged, setConverged] = useState(false);
  const cardRefs = useRef<HTMLDivElement[]>(new Array());
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
      };
    } else {
      return boundRect;
    }
  };

  // calculate how far each card needs to shift to reach deck source position
  const calculateDist = () => {
    // source position
    if (!sourceRef.current) return;
    const sourcePos = sourceRef.current.getBoundingClientRect();

    // calculate distance between each card position to source position
    let dist: DeckCoordType[] = [];
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardPos = calculatePos(card);
      const distX = sourcePos.x - cardPos.x;
      const distY = sourcePos.y - (cardPos.y + cardPos.height / 2);
      dist[i] = { x: distX, y: distY };
    });

    // update context state to store calculated distances
    setDistances(dist);
  };

  const dbCalcDist = debounce(() => {
    calculateDist();
  });

  useEffect(() => {
    calculateDist();
  }, [cardRefs, sourceRef]);

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
        distances,
        setConverged,
        calculateDist,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

/***************************
 *      DECK HOOK
 **************************/
export const useDeck = () => {
  const { cardRefs, sourceRef, distances, setConverged } =
    useContext(DeckContext);

  // returns true if relevant elements are loaded and not mid animation
  const checkReady = () => {
    return !(
      !sourceRef.current ||
      !cardRefs.current ||
      cardRefs.current[cardRefs.current.length - 1]?.classList.contains(
        "animating"
      )
    );
  };

  // spread the cards out
  const spreadDeck = () => {
    if (!checkReady()) return;

    setConverged(false);
    cardRefs.current.forEach((card, i) => {
      // will never occur; just here bc editor does not detech that checkReady() catches nulls
      if (card == null) return;

      if (card.style.transform == "") {
        return;
      }

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
    if (!checkReady()) {
      return;
    }

    setConverged(true);
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

  return { convergeDeck, spreadDeck };
};
