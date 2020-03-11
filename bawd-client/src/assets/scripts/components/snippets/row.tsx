import * as React from "react";

const Row: React.FC = ({ children }) => (
  <div className={`flex flex-wrap w-full`}>
    {children}
  </div>
);

export default Row;
