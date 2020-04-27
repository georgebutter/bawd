import * as React from "react";

const Select: React.FC<IProps> = ({
  children, error, success, onChange, value, label
}) => (
  <React.Fragment>
    <label
      className={"w-full py-1 text-xs lh-crop"}
      htmlFor={name}
    >
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e)}
      className={`w-full bg-bg h-10 text-text rounded border-2 ${error ? `border-error` : ``} ${success ? `border-success` : ``} ${!success && !error ? `border-transparent` : ``}`}
    >
      {children}
    </select>
  </React.Fragment>
);

interface IProps {
  error?: string;
  success?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  label: string;
  name: string;
}

export default Select;
