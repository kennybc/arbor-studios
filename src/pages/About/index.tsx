import { useEffect } from "react";

import { useDeck } from "@/utils/deck";

import "./index.css";

const About = () => {
  const { convergeDeck } = useDeck();

  useEffect(() => {
    convergeDeck(0);
  }, []);

  return <>About</>;
};

export default About;
