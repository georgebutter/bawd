import * as React from "react";

const Image: React.FC<{
  src: string;
  fit?: "cover" | "contain";
  className?: string;
}> = ({ src, fit, className }) => (
  <img src={src} className={`${fit ? `object-${fit}` : ``} ${className ? className : ""}`} />
);

export default Image;
