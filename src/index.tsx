import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { DeckProvider } from "@/utils/deck";
import DeckRouter from "@/components/Deck/DeckRouter";
import * as Pages from "@/pages";

import "./global.css";

const App = () => {
  return (
    <Router>
      <DeckProvider>
        <DeckRouter>
          <Route index element={<Pages.Home />} />
          <Route path="about" element={<Pages.About />} />
          <Route path="metaphysics" element={<Pages.Metaphysics />} />
          <Route path="offerings" element={<Pages.Offerings />} />
          <Route path="system" element={<Pages.System />} />
          <Route path="lineage" element={<Pages.Lineage />} />
          <Route path="contact" element={<Pages.Contact />} />
        </DeckRouter>
      </DeckProvider>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
