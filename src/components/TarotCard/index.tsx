import "./index.css";

function TarotCard({ index }: { index: number }) {
  const offsetY = 50; // padding-top increments
  const offsetX = 3; // number of cards to shift sine wave pattern by

  const getSrc = () => {
    return new URL(`../../assets/${index}.png`, import.meta.url).href;
  };

  return (
    <div
      className="TarotCard"
      style={{
        paddingTop:
          Math.sin(((index - offsetX) * Math.PI) / 2) * offsetY + offsetY,
      }}
    >
      <img src={getSrc()} />
    </div>
  );
}

export default TarotCard;
