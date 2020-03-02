import * as React from "react";
import { CloseIcon } from "./icons";

const Popup: React.FC<IProps> = ({ children, setPopup }) => {
  return (
    <div className={`fixed inset-0 ${children ? `` : `opacity-0 invisible pointer-events-none`}`}>
      <div className={`absolute inset-0 bg-white opacity-50`}
        onClick={() => setPopup(null)}
      />
      <div className={`absolute inset-0 flex items-center justify-center`}>
        <div className={`bg-gray-300 rounded-lg w-full max-w-lg p-2 relative`}>
          <button
            className={`absolute right-0 top-0 p-2`}
            onClick={() => setPopup(null)}
          >
            <CloseIcon size={24} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

interface IProps {
  setPopup: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

export default Popup;
