import { ReactNode } from "react";
import { motion } from "framer-motion";

import "./index.css";

const Page = ({ children }: { children: ReactNode }) => {
  const variants = {
    animate: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      transition: {
        duration: 0.35,
      },
    },
  };

  return (
    <motion.div
      className="Page"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationStart={() =>
        document.querySelector("html")?.scrollTo({ top: 0, behavior: "smooth" })
      }
    >
      <div className="Page__content">{children}</div>
    </motion.div>
  );
};

export default Page;
