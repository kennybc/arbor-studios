import {
  forwardRef,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  useContext,
} from "react";
import { Link } from "react-router-dom";

import DeckContext from "../DeckContext";

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
  const { converged } = useContext(DeckContext);

  const offsetY = 4; // padding-top vw units
  const offsetX = 3; // number of cards to shift sine wave pattern by

  const isConverged = converged != -1;

  const getSrc = () => {
    return new URL(`../../../assets/${props.index}.png`, import.meta.url).href;
  };

  return (
    <div
      className="TarotCard"
      style={{
        marginTop:
          Math.sin(((props.index - offsetX) * Math.PI) / 2) * offsetY +
          offsetY +
          "vw",
      }}
      ref={ref}
      {...rest}
    >
      <Link to={isConverged ? "/" : props.to}>
        <div className="TarotCard__ratio"></div>
        <img
          className={isConverged ? "converged" : ""}
          draggable={false}
          src={getSrc()}
        />
      </Link>
    </div>
  );
});

export default TarotCard;
