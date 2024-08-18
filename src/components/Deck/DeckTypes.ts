import { MutableRefObject, Dispatch, SetStateAction } from "react";

export type DeckCoordType = {
  x: number;
  y: number;
};

export type DeckContextType = {
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
