import * as React from "react";

const Button: React.FC<IProps> = ({ children, onClick }) => (
  <button
    className={`bg-green-400 text-sm text-white px-4 py-2 rounded flex items-center outline-none active:outline-none focus:outline-none`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface IProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default Button;
