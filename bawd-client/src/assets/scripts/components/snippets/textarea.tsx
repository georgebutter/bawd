import * as React from "react";

const TextArea: React.FC<IProps> = ({ placeholder, label, name, value, onChange, error, success }) => (
  <React.Fragment>
    {error ? (
      <small className={`text-red-500`}>
        {error}
      </small>
    ) : null}
    <label className={"w-full py-1 text-xs lh-crop"} htmlFor={name}>{label}</label>
    <textarea
      className={`w-full p-1 rounded border-2 ${error ? `border-red-500` : ``} ${success ? `border-green-500` : ``} ${!success && !error ? `border-transparent` : ``}`}
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
  error?: string;
  success?: boolean;
}

export default TextArea;
