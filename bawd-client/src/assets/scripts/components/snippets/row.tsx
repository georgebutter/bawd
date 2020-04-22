import * as React from "react";

const Row: React.FC<IProps> = ({ children, className }) => (
  <div className={`flex flex-wrap flex-row -ml-2 ${className ? className : ``}`}>
    {children}
  </div>
);

export interface IProps {
  className?: string;
}

export default Row;
