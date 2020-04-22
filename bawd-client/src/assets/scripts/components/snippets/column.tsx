import * as React from "react";

const Column: React.FC<IProps> = ({
  children, width = "full", align = "start", vertical = "start", className
}) => (
  <div
    className={`flex flex-wrap w-${width} py-2 pl-2 justify-${align} items-${vertical} ${className ? className : ""}`}
  >
    {children}
  </div>
);

interface IProps {
  className?: string;
  width?: "1/2" | "1/3" | "2/3" | "full";
  align?: "start" | "center" | "end";
  vertical?: "start" | "center" | "end";
}

export default Column;
