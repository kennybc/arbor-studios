import { useLayoutEffect, useState } from "react";

export default function useScroll() {
  const [scroll, setScroll] = useState(0);

  useLayoutEffect(() => {
    function updateScroll() {
      setScroll(window.scrollY);
    }
    updateScroll();
    window.addEventListener("load", updateScroll);
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("load", updateScroll);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return scroll;
}
