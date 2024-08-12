import { useEffect } from "react";

import { useDeck } from "@/utils/deck";

import "./index.css";

const Lineage = () => {
  const { convergeDeck } = useDeck();

  useEffect(() => {
    convergeDeck(4);
  }, []);

  return <>Lineage</>;
};

export default Lineage;
