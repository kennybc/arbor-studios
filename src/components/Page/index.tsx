import { ReactNode } from "react";

import "./index.css";

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <div className="Page">
      <div className="Page__content">{children}</div>
    </div>
  );
};

export default Page;
