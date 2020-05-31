import * as React from "react";

const Container: React.FC<IProps> = ({ children, className, width = "6xl" }) => (
  <div className={`max-w-${width} mx-auto w-full px-2 ${className ? className : ``}`}>
    {children}
  </div>
);

interface IProps {
  className?: string;
  width?: "xl" | "6xl";
}

export default Container;
