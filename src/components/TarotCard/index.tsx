import React from "react";
import "./index.css";

interface TarotCardProps {
  index: number;
}

const TarotCard = React.forwardRef<HTMLDivElement, TarotCardProps>(
  (props, ref) => {
    const offsetY = 50; // padding-top increments
    const offsetX = 3; // number of cards to shift sine wave pattern by

    const getSrc = () => {
      return new URL(`../../assets/${props.index}.png`, import.meta.url).href;
    };

    return (
      <div
        className="TarotCard"
        style={{
          marginTop:
            Math.sin(((props.index - offsetX) * Math.PI) / 2) * offsetY +
            offsetY,
        }}
        ref={ref}
      >
        <img src={getSrc()} />
      </div>
    );
  }
);

export default TarotCard;
