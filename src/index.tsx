import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { DeckProvider } from "./utils/deck";
import * as Pages from "@/pages";

import "./global.css";

const App = () => {
  return (
    <DeckProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Pages.Layout />}>
            <Route index element={<Pages.Home />} />
            <Route path="about" element={<Pages.About />} />
            <Route path="metaphysics" element={<Pages.Metaphysics />} />
            <Route path="offerings" element={<Pages.Offerings />} />
            <Route path="system" element={<Pages.System />} />
            <Route path="lineage" element={<Pages.Lineage />} />
            <Route path="contact" element={<Pages.Contact />} />
          </Route>
        </Routes>
      </Router>
    </DeckProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
