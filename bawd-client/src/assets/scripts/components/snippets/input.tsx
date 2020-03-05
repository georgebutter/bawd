import * as React from "react";

const Input: React.FC<IProps> = ({ type = "text", placeholder, label, name, value }) => (
  <React.Fragment>
    <label className={"w-full py-1 text-xs lh-crop"} htmlFor={name}>{label}</label>
    <input className={"w-full p-1 rounded"} name={name} type={type} placeholder={placeholder} />
  </React.Fragment>
);

interface IProps {
  type?: "text";
  placeholder?: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default Input;
