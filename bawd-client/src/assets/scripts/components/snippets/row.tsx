import * as React from "react";

const Row: React.FC<IProps> = ({ children, className }) => (
  <div className={`flex flex-wrap w-full ${className ? className : ``}`}>
    {children}
  </div>
);

export interface IProps {
  className?: string;
}

export default Row;
