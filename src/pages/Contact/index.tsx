import { useEffect } from "react";

import { useDeck } from "@/utils/deck";

import "./index.css";

const Contact = () => {
  const { convergeDeck } = useDeck();

  useEffect(() => {
    convergeDeck(5);
  }, []);

  return <>Contact</>;
};

export default Contact;
