import * as DOMPurify from "dompurify";
import * as marked from "marked";
import * as React from "react";
import * as Icon from "../icons";
import Button from "./button";

const MarkdownInput: React.FC<IProps> = ({
  placeholder,
  label,
  name,
  value,
  onChange,
  error,
  success,
}) => {
  const fieldClass = `bg-bg text-text block h-32 text-bg w-full p-1 rounded-b border-1 ${error ? `border-error` : ``} ${success ? `border-success` : ``} ${!success && !error ? `border-faded` : ``}`
  const [view, setView] = React.useState<string>("write");
  return (
    <React.Fragment>
      <label className={"w-full py-1 text-xs lh-crop"} htmlFor={name}>{label}</label>
      {error ? (
        <p className={`text-error`}>
          {error}
        </p>
      ) : null}
      <div className="border rounded border-faded w-full bg-bg">
        <div className="p-2 border-b border-faded flex items-center">
          <Button
            type="button"
            colour="blank"
            onClick={() => setView((prev) => prev === "write" ? "preview" : "write")}
          >
            {view === "write" ? (
              <Icon.Eye size={18} />
            ) : (
              <Icon.NoEye size={18} />
            )}
          </Button>
        </div>
        {view === "write" ? (
          <textarea
            className={fieldClass}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        ) : (
          <div className={`${fieldClass} rte`}
            dangerouslySetInnerHTML={{ __html: marked(DOMPurify.sanitize(value)) }}
          />
        )}
      </div>
      <small className="text-xs">
        Markdown supported
      </small>
    </React.Fragment>
  );
};

interface IProps {
  placeholder?: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  success?: boolean;
}
export default MarkdownInput;
