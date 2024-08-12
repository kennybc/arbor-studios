import React from "react";

import "./index.css";
import { Link } from "react-router-dom";

interface TarotCardProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  index: number;
  to: string;
}

const TarotCard = React.forwardRef<HTMLDivElement, TarotCardProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const offsetY = 50; // padding-top increments
    const offsetX = 3; // number of cards to shift sine wave pattern by

    const getSrc = () => {
      return new URL(`../../../assets/${props.index}.png`, import.meta.url)
        .href;
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
        {...rest}
      >
        <Link to={props.to}>
          <img src={getSrc()} />
        </Link>
      </div>
    );
  }
);

export default TarotCard;
