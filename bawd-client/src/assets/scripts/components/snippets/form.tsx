import * as React from "react";

const Form: React.FC<IProps> = ({ children, onSubmit }) => (
  <form
    className={`flex flex-wrap w-full`}
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

interface IProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default Form;
