import { useEffect } from "react";

import { useDeck } from "@/utils/deck";

import "./index.css";

const Offerings = () => {
  const { convergeDeck } = useDeck();

  useEffect(() => {
    convergeDeck(2);
  }, []);

  return <>Offerings</>;
};

export default Offerings;
