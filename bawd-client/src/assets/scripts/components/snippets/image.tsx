import * as React from "react";

export const Image: React.FC<{
  src: string;
}> = ({ src }) => (
  <img src={src} />
);
