import * as React from "react";

const Input: React.FC<IProps> = ({
  type = "text", placeholder, label, name, value, onChange, error, success, autoComplete, onBlur
}) => (
  <React.Fragment>
    {error ? (
      <small className={`text-red-500`}>
        {error}
      </small>
    ) : null}
    <label
      className={"w-full py-1 text-xs lh-crop"}
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className={`text-bg w-full p-1 rounded border-2 ${error ? `border-error` : ``} ${success ? `border-success` : ``} ${!success && !error ? `border-transparent` : ``}`}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autoComplete}
    />
  </React.Fragment>
);

interface IProps {
  type?: "text";
  placeholder?: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: boolean;
  autoComplete?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default Input;
