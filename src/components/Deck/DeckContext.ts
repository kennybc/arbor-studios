import { createContext } from "react";

import { DeckContextType } from "./DeckTypes";

const DeckContext = createContext({} as DeckContextType);

export default DeckContext;
