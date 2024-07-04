import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as Pages from "@/pages";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<Pages.Layout />}>
        <Route index element={<Pages.Home />} />
      </Route>
    </Routes>
  </Router>
);
