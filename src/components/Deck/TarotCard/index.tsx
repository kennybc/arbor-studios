import { forwardRef, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

import { useDeck } from "@/utils/deck";

import "./index.css";

interface TarotCardProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  index: number;
  to: string;
}

const TarotCard = forwardRef<HTMLDivElement, TarotCardProps>((props, ref) => {
  const { children, ...rest } = props;
  const { converged } = useDeck();

  const offsetY = 50; // padding-top increments
  const offsetX = 3; // number of cards to shift sine wave pattern by

  const getSrc = () => {
    return new URL(`../../../assets/${props.index}.png`, import.meta.url).href;
  };

  return (
    <div
      className="TarotCard"
      style={{
        marginTop:
          Math.sin(((props.index - offsetX) * Math.PI) / 2) * offsetY + offsetY,
      }}
      ref={ref}
      {...rest}
    >
      <Link to={converged ? "/" : props.to}>
        <img src={getSrc()} />
      </Link>
    </div>
  );
});

export default TarotCard;
