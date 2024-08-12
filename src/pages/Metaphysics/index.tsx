import { useEffect } from "react";

import { useDeck } from "@/utils/deck";

import "./index.css";

const Metaphysics = () => {
  const { convergeDeck } = useDeck();

  useEffect(() => {
    convergeDeck(1);
  }, []);

  return <>Metaphysics</>;
};

export default Metaphysics;
