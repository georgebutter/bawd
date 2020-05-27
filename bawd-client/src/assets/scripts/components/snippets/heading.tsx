import * as React from "react";

const Heading: React.FC<IProps> = ({ children, size, tag, className, itemprop }) => {
  const sizes: any = {
    h1: "text-5xl font-bold",
    h2: "text-4xl font-semibold",
    h3: "text-3xl font-semibold",
    h4: "text-2xl font-semibold",
    h5: "text-xl font-semibold",
    h6: "text-sm",
  };
  const style: string = size ? sizes[size] : sizes[tag];
  const classes: string = `lh-crop ${style} ${className ? className : ""}`;
  return React.createElement(tag, {
    className: classes,
    itemProp: itemprop,
  }, children);
};

interface IProps {
  /** Additonal classes to apply to the heading */
  className?: string;
  /** Default styling section from the style guide, only affect the style */
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** The tag of the element, if no size is selected it will use the matching size. */
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Optional schema.org markup */
  itemprop?: string;
}

export default Heading;
