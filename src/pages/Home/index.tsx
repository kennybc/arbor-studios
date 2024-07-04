import useScroll from "@/utils/useScroll.ts";
import { useRef } from "react";

import Logo from "@/assets/logo.svg?react";
import Ring from "@/assets/ring.svg?react";
import Barcode from "@/assets/barcode.svg?react";

import "./index.css";
import { useEffect } from "react";

const Home = () => {
  const ring1 = useRef<HTMLDivElement>(null);
  const ring2 = useRef<HTMLDivElement>(null);
  const ring3 = useRef<HTMLDivElement>(null);
  const position = useScroll();
  useEffect(() => {
    //if (position < 500) {
    if (ring1.current) {
      ring1.current.style.opacity = 1 - position / 500 + "";
      ring1.current.style.transform = "rotate(" + position / 50 + "deg)";
    }
    if (ring2.current) {
      ring2.current.style.opacity = 1 - position / 500 + "";
      ring2.current.style.transform = "rotate(-" + position / 50 + "deg)";
    }
    if (ring3.current) {
      ring3.current.style.opacity = 1 - position / 500 + "";
      ring3.current.style.transform = "rotate(" + position / 50 + "deg)";
    }
    //}
  }, [position]);
  return (
    <div className="Home">
      <Logo className="Home__logo" />
      <div className="Home__landing">
        <div className="Home__rings">
          <div ref={ring1}>
            <Ring className="Home__ring" />
          </div>
          <div ref={ring2}>
            <Ring className="Home__ring" />
          </div>
          <div ref={ring3}>
            <Ring className="Home__ring" />
          </div>
        </div>
      </div>

      <div
        style={{ width: "100%", height: "100vh", background: "#0c1d15" }}
      ></div>
    </div>
  );
};

export default Home;
