import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import * as Store from "store";
import { IPopup } from "../types";
import * as Icons from "./icons";
import * as Sections from "./sections";
import { Button, Popup, RouterCallback } from "./snippets";
import {
  Board,
  Boards,
  Error,
  Home,
  Post,
} from "./templates";

const routes = [
  {
    exact: true,
    main: () => <Home />,
    path: "/",
  },
  {
    exact: true,
    main: () => <Boards />,
    path: "/boards",
  },
  {
    exact: true,
    main: () => <Board />,
    path: "/boards/:boardHandle",
  },
  {
    exact: true,
    main: () => <Post />,
    path: "/boards/:boardHandle/:postId/:postHandle",
  },
  {
    exact: false,
    main: () => <Error />,
    path: "*",
  },
];

const applyLight = () => {
  const { style } = document.documentElement;
  style.setProperty("--bg", "#fff");
  style.setProperty("--text", "#221524");
  style.setProperty("--faded", "#7c7086");
  style.setProperty("--fg", "#ece9f1");
  style.setProperty("--primary", "#6979f8");
  style.setProperty("--success", "#00C48C");
  style.setProperty("--error", "#FF647C");
  style.setProperty("--primary-faded", "#A5AFFB");
};
const applyDark = () => {
  const { style } = document.documentElement;
  style.setProperty("--bg", "#3f3356");
  style.setProperty("--text", "#d0c9d6");
  style.setProperty("--faded", "#7c7086");
  style.setProperty("--fg", "#221524");
  style.setProperty("--primary", "#6979f8");
  style.setProperty("--success", "#00C48C");
  style.setProperty("--error", "#FF647C");
  style.setProperty("--primary-faded", "#A5AFFB");
};

const Bawd: React.FC = () => {
  const prefersColourScheme = matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  const prefersDark = Store.get("prefersDark");
  const [dark, setDark] = React.useState<boolean>(prefersDark || prefersColourScheme);
  const [popup, setPopup] = React.useState<IPopup>(null);
  const [menuActive, setMenuActive] = React.useState<boolean>(false);

  const changeDarkMode = (change?: "dark" | "light") => {
    setDark((prev) => {
      const next = change === "dark" ? true : change === "light" ? false : !prev;
      if (next) {
        applyDark();
      } else {
        applyLight();
      }
      Store.set("prefersDark", next);
      return next;
    });
  };

  React.useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const change = e.matches ? "dark" : "light";
      if (!Store.get("prefersDark")) {
        changeDarkMode(change);
      }
    });

    document.addEventListener("popup:toggle", (event: CustomEvent) => {
      setPopup((prev) => !prev ? event.detail : null);
    });
    document.addEventListener("menu:toggle", (event: CustomEvent) => {
      setMenuActive((prev) => !prev ? event.detail : false);
    });
    if (prefersDark !== prefersColourScheme && matchMedia) {
      changeDarkMode(prefersDark ? "dark" : "light");
    }
  }, []);

  return (
    <Router>
      <div className="h-full flex flex-col md:flex-row bg-fg">
        <Sections.Menu
          changeDarkMode={changeDarkMode}
          active={menuActive}
        />
        <main className={`px-2 py-2 pb-16 md:pb-2 overflow-y-auto h-full w-full `}>
          <div className="bg-bg rounded-lg overflow-hidden">
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
            </Switch>
          </div>
        </main>
      </div>
      <Sections.MobileNavigation
        setMenuActive={setMenuActive}
        changeDarkMode={changeDarkMode}
      />
      <Popup
        setPopup={setPopup}
        popup={popup}
      />
      <RouterCallback />
    </Router>
  );
};

export default Bawd;
