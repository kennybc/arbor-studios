import { ReactNode } from "react";
import { motion } from "framer-motion";

const Section = ({ children }: { children: ReactNode }) => {
  const variants = {
    initial: {
      transform: "translateY(40px)",
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transform: "none",
    },
    exit: {
      transform: "translateY(40px)",
      opacity: 0,
    },
  };
  return <motion.div variants={variants}>{children}</motion.div>;
};

export default Section;
