import "./index.css";

function TarotCard({ index }: { index: number }) {
  const getSrc = () => {
    return new URL(`../../assets/${index}.png`, import.meta.url).href;
  };

  return (
    <div className="TarotCard">
      <img src={getSrc()} />
    </div>
  );
}

export default TarotCard;
