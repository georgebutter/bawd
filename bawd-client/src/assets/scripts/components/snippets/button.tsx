import * as React from "react";

const Button: React.FC<IProps> = ({
  children, onClick, colour = "primary", disabled, type = "button",
}) => {
  const primaryCommon = "bg-primary text-sm text-bg px-4 py-2 rounded flex items-center outline-none active:outline-none focus:outline-none";
  const secondaryCommon = "bg-bg text-sm text-primary px-4 py-2 rounded flex items-center outline-none active:outline-none focus:outline-none";
  const classes: {
    [key in Colours]: {
      disabled: string;
      default: string;
    };
  } = {
    blank: {
      default: "outline-none active:outline-none focus:outline-none",
      disabled: "outline-none active:outline-none focus:outline-none",
    },
    primary: {
      default: primaryCommon,
      disabled: `${primaryCommon} cursor-not-allowed opacity-50`,
    },
    secondary: {
      default: secondaryCommon,
      disabled: `${secondaryCommon} cursor-not-allowed opacity-50`,
    },
  };
  return (
    <button
      className={classes[colour][disabled ? "disabled" : "default"]}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

interface IProps {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  colour?: Colours;
  type?: "submit" | "button";
}

type Colours = "primary" | "secondary" | "blank";

export default Button;
