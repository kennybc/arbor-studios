import { useEffect } from "react";

import { useDeck } from "@/utils/deck";

import "./index.css";

const Home = () => {
  const { spreadDeck } = useDeck();

  useEffect(() => {
    spreadDeck();
  }, []);

  return <>Home</>;
};

export default Home;
