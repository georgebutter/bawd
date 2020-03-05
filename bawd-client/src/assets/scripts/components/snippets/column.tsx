import * as React from "react";

const Column: React.FC<IProps> = ({ children, width = "full", align = "start", vertical = "start" }) => (
  <div className={`flex flex-wrap w-${width} p-2 justify-${align} items-${vertical}`}>
    {children}
  </div>
);

interface IProps {
  width?: "1/2" | "full";
  align?: "start" | "center" | "end";
  vertical?: "start" | "center" | "end";
}

export default Column;
