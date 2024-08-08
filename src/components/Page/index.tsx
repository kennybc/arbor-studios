import { ReactNode } from "react";

import "./index.css";

const Page = ({ children }: { children: ReactNode }) => {
  return <div className="Page">{children}</div>;
};

export default Page;
