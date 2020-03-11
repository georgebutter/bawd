import * as React from "react";

const TextArea: React.FC<IProps> = ({ placeholder, label, name, value, onChange }) => (
  <React.Fragment>
    <label className={"w-full py-1 text-xs lh-crop"} htmlFor={name}>{label}</label>
    <textarea
      className={"w-full p-1 rounded"}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  </React.Fragment>
);

interface IProps {
  placeholder?: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default TextArea;
