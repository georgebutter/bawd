import * as React from "react";

const Container: React.FC = ({ children }) => (
  <div className={`max-w-6xl mx-auto w-full flex flex-wrap px-2`}>
    {children}
  </div>
);

export default Container;
