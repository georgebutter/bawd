import * as React from "react";

const Container: React.FC<IProps> = ({ children, className }) => (
  <div className={`max-w-6xl mx-auto w-full px-2 ${className ? className : ``}`}>
    {children}
  </div>
);

export interface IProps {
  className?: string;
}

export default Container;
