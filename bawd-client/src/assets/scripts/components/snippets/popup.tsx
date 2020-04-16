import * as React from "react";
import { CloseIcon } from "../icons";

const Popup: React.FC<IProps> = ({ children, setPopup }) => {
  return (
    <div className={`fixed inset-0 ${children({ setPopup }) ? `` : `opacity-0 invisible pointer-events-none`}`}>
      <div className={`fixed inset-0 bg-bg opacity-50 backdrop-blur`} onClick={() => setPopup(null)}/>
      <button
        className={`absolute right-0 top-0 p-2`}
        onClick={() => setPopup(null)}
      >
        <CloseIcon size={24} />
      </button>
      <div className={`flex flex-col h-full justify-center p-2 w-full`}>
        <div
          className={`bg-fg max-w-lg min-h-8 mx-auto overflow-y-auto relative rounded-lg w-full`}
        >
          {children({ setPopup })}
        </div>
      </div>
    </div>
  );
};

interface IProps {
  setPopup: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  children: (props: {setPopup: IProps["setPopup"]}) => React.ReactNode;
}

export default Popup;
