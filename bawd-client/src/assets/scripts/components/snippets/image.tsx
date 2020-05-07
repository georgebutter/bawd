import * as React from "react";

const Image: React.FC<{
  src: string;
}> = ({ src }) => (
  <img src={src} />
);

export default Image;
