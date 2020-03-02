import * as React from "react";

const Row: React.FC = ({ children }) => (
  <div className={`flex flex-wrap w-full -ml-2`}>
    {children}
  </div>
);

export default Row;
