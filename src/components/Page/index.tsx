import { ReactNode } from "react";
import { motion } from "framer-motion";

import "./index.css";

const Page = ({ children }: { children: ReactNode }) => {
  const transition = { duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] };

  const variants = {
    initial: {
      transform: "translateY(40px)",
      opacity: 0,
    },
    animate: {
      transform: "none",
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: [0.43, 0.13, 0.23, 0.96],
        delay: 0.7,
      },
    },
    exit: {
      transform: "translateY(40px)",
      opacity: 0,
    },
  };
  return (
    <motion.div
      className="Page"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      <div className="Page__content">{children}</div>
    </motion.div>
  );
};

export default Page;
