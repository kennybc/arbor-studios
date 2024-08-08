const convergeDeck = (
  sourceRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.RefObject<HTMLDivElement[] | null[]>
) => {
  // quit if refs don't exist yet or are still transitioning
  if (!sourceRef.current || !cardRefs.current) return;
  if (
    cardRefs.current[cardRefs.current.length - 1]?.classList.contains(
      "converging"
    )
  )
    return;

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
      cardRef.classList.add("converging");
      cardRef.addEventListener("transitionend", () => {
        cardRef.classList.remove("converging");
      });
      console.log(distX);
      console.log(distY);
    }
  });
};

export default convergeDeck;
