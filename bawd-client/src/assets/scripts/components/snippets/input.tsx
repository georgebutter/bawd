import * as React from "react";
import { Button } from ".";
import * as Icon from "../icons";

const Input: React.FC<IProps> = ({
  type = "text", placeholder, label, name, value, onChange, error, warning, success, autoComplete, onBlur
}) => {
  const [currentType, setCurrentType] = React.useState<IProps["type"]>(type);
  return (
    <React.Fragment>
      <label
        className={"w-full py-1 text-xs lh-crop"}
        htmlFor={name}
      >
        {label}
      </label>
      {error ? (
        <p className={`text-error`}>
          {error}
        </p>
      ) : null}
      {warning ? (
        <p className={`text-warning`}>
          {warning}
        </p>
      ) : null}
      <div className={`text-text bg-bg w-full p-1 relative rounded border-2 ${error ? `border-error` : ``} ${warning ? `border-warning` : ``} ${success ? `border-success` : ``} ${!success && !warning && !error ? `border-transparent` : ``}`}>
        <input
          className="bg-transparent w-full"
          name={name}
          type={currentType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
        />
        {type === "password" ? (
          <div className="absolute right-0 top-0 bottom-0 px-1 flex items-center">
            <Button
              colour="blank"
              onClick={() => setCurrentType((prev) => prev === "text" ? "password" : "text")}
            >
              {currentType === "password" ? (
                <Icon.Eye size={12} />
              ) : (
                <Icon.NoEye size={12} />
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

interface IProps {
  type?: "text" | "password";
  placeholder?: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  warning?: string;
  success?: boolean;
  autoComplete?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default Input;
