import { useEffect } from "react";

import { useDeck } from "@/utils/deck";

import "./index.css";

const System = () => {
  const { convergeDeck } = useDeck();

  useEffect(() => {
    convergeDeck(3);
  }, []);

  return <>System</>;
};

export default System;
