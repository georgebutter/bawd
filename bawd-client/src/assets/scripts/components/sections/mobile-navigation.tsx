import * as React from "react";
import * as Icons from "../icons";
import {
  Button,
} from "../snippets";

export const MobileNavigation: React.FC<IProps> = ({
  setMenuActive,
  changeDarkMode,
}) => (
  <nav className="w-full md:hidden flex justify-between border-faded border-t z-10 bg-bg absolute bottom-0 left-0 right-0">
    <div className="p-2">
      <Button
        colour="sidebar"
        onClick={() => setMenuActive((prev) => !prev)}
      >
        <Icons.Menu />
      </Button>
    </div>
    <div className="p-2">
      <Button
        colour="sidebar"
        href="/"
      >
        <Icons.Home />
      </Button>
    </div>
    <div className="p-2">
      <Button
        colour="sidebar"
        onClick={() => changeDarkMode()}
      >
        <Icons.Contrast />
      </Button>
    </div>
  </nav>
);

interface IProps {
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
  changeDarkMode: () => void;
}
