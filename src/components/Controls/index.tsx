import { locations } from "@/components/Deck/DeckRouter";

import "./index.css";
import { Link } from "react-router-dom";

const Controls = ({ index }: { index: number }) => {
  const prev = index == 0 ? "/" : locations[index - 1];
  const next = index == 5 ? "/" : locations[index + 1];

  const formatControlName = (path: string) => {
    if (path == "/") {
      return "Home";
    }
    return path.substring(1);
  };
  return (
    <div className="Controls">
      <Link to={prev}>
        <div className="Controls__prev">&larr; {formatControlName(prev)}</div>
      </Link>
      <Link to={next}>
        <div className="Controls__next">{formatControlName(next)} &rarr;</div>
      </Link>
    </div>
  );
};

export default Controls;
