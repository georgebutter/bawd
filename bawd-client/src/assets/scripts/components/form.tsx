import * as React from "react";

const Form: React.FC<IProps> = ({ children, onSubmit }) => (
  <form
    className={`flex flex-wrap w-full -ml-2`}
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

interface IProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default Form;
