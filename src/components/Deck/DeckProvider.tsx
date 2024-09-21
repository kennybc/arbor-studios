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

  // calculate the exact coordinate position of a card
  const calculatePos = (card: HTMLDivElement) => {
    const boundRect = card.getBoundingClientRect();
    if (card.style.transform) {
      var style = window.getComputedStyle(card);
      var matrix = new WebKitCSSMatrix(style.transform);
      return {
        x: boundRect.x - matrix.m41,
        y: boundRect.y - matrix.m42,
      };
    } else {
      return boundRect;
    }
  };

  // calculate how far one card needs to shift to reach deck source position
  const calculateDist = (
    card: HTMLDivElement,
    cardWidth: number,
    cardHeight: number,
    sourcePos: DeckCoordType
  ) => {
    if (!card) return;
    const cardPos = calculatePos(card);
    const distX = sourcePos.x - (cardPos.x + cardWidth / 2);
    const distY = sourcePos.y - (cardPos.y + cardHeight / 2);
    return { x: distX, y: distY };
  };

  // calculate how far each card needs to shift to reach deck source position
  const calculateDists = () => {
    // source position
    if (!sourceRef.current || !contentRef.current) return;

    // need to calculate the height from the width bc the image doesn't load sometimes
    // which leaves the height 0, whereas the width of the image will always fill up the
    // container which is determined by the DOM flex
    const cardWidth = cardRefs.current[0].offsetWidth;
    const cardHeight = 1.5 * cardWidth;

    // dynamically set source position (card ratio is 450/300) = 1.5
    sourceRef.current.style.top = -10 + cardHeight / 2 + "px";

    // dynamically set top padding of text content to account for card height
    contentRef.current.style.removeProperty("padding-top");
    contentRef.current.style.paddingTop = cardHeight + "px";

    const sourcePos = sourceRef.current.getBoundingClientRect();

    // calculate distance between each card position to source position
    let dist: DeckCoordType[] = [];
    cardRefs.current.forEach((card, i) => {
      let cardDist = calculateDist(card, cardWidth, cardHeight, sourcePos);
      if (cardDist) {
        dist[i] = cardDist;
      }
    });

    // update context state to store calculated distances
    setDistances(dist);

    // move "home" card (that sits between the top card and rest of deck) into place
    let homeCard = cardRefs.current[0].parentElement
      ?.nextElementSibling as HTMLDivElement;
    if (homeCard) {
      homeCard.style.width = cardWidth + "px";
      homeCard.style.marginTop = "0";
      let cardDist = calculateDist(homeCard, cardWidth, cardHeight, sourcePos);
      if (cardDist) {
        homeCard.style.transform = `translate(${cardDist.x}px, ${cardDist.y}px)`;
      }
    }
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

    // hide "home" card (fade out animation)
    let homeCard = cardRefs.current[0].parentElement
      ?.nextElementSibling as HTMLDivElement;

    // "spread" vs "hidden":
    // - "spread" is applied/removed immediately when spread/converge are called
    // - "hidden" is applied/removed conditionally on transitionend events
    homeCard.classList.add("spread");

    if (!homeCard.classList.contains("hidden")) {
      homeCard.classList.add("fading");

      const fadeEventHandler = (e: TransitionEvent) => {
        if (e.target != homeCard) return;
        homeCard.classList.add("hidden");
        homeCard.classList.remove("fading");
        homeCard.removeEventListener("transitionend", fadeEventHandler);
      };
      homeCard.addEventListener("transitionend", fadeEventHandler);
    }

    // show deck (hidden by default to prevent 1-frame flash when loading a non-home page)
    (
      cardRefs.current[0].parentElement?.parentElement as HTMLDivElement
    ).style.opacity = "1";
  };

  // converge the cards to a source location with a given card on top
  const convergeDeck = (index: number, animate: boolean = true) => {
    if (converged != -1 && index != converged) return drawCard(index);

    setConverged(index);

    let homeCard = cardRefs.current[0].parentElement
      ?.nextElementSibling as HTMLDivElement;

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

      // transition cards to source location
      if (animate) {
        card.style.transition = `transform 0.6s ease ${i * 50}ms`;

        // when animation finishes, remove classes and handlers
        const convergeEventHandler = (e: TransitionEvent) => {
          if (e.target != card) return;
          card.classList.remove("animating");
          card.removeEventListener("transitionend", convergeEventHandler);

          // show "home" card
          if (!homeCard.classList.contains("spread")) {
            homeCard.classList.remove("hidden");
          }
        };
        card.addEventListener("transitionend", convergeEventHandler);
      } else {
        // first page load
        card.style.removeProperty("transition");
        let homeCard = card.parentElement?.nextElementSibling as HTMLDivElement;
        homeCard.classList.remove("hidden");

        // show deck
        (
          cardRefs.current[0].parentElement?.parentElement as HTMLDivElement
        ).style.opacity = "1";
      }
      card.style.transform = `translate(${distances[i].x}px, ${distances[i].y}px)`;
    });

    homeCard.classList.remove("spread");
  };

  // when deck is already converged: draw a given card and place it on top
  const drawCard = (index: number) => {
    const prev = converged;

    setConverged(index);

    const card = cardRefs.current[index];
    card.classList.add("animating");
    card.classList.add("selected");
    card.classList.add("drawing");

    // when animation finishes, remove classes and handlers
    const drawEventHandler = () => {
      card.classList.remove("animating");
      card.classList.remove("drawing");

      cardRefs.current[prev].classList.remove("selected");
      card.classList.add("selected");

      card.removeEventListener("animationend", drawEventHandler);
    };
    card.addEventListener("animationend", drawEventHandler);
  };

  const dbCalcDist = debounce(() => {
    calculateDists();
  }, 200);

  useEffect(() => {
    calculateDists();
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
        calculateDists,
        convergeDeck,
        spreadDeck,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export default DeckProvider;
