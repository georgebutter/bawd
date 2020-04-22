import * as React from "react";
import * as Icons from "./icons";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom";

import { IPopup } from "../types";

import {
  Button,
  Column,
  Container,
  Heading,
  Popup,
  Row,
} from "./snippets";

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
  style.setProperty("--fg", "#ece9f1");
  style.setProperty("--primary", "#6979f8");
  style.setProperty("--success", "#00C48C");
  style.setProperty("--error", "#FF647C");
  style.setProperty("--primary-faded", "#A5AFFB");
};
const applyDark = () => {
  const { style } = document.documentElement;
  style.setProperty("--bg", "#221524");
  style.setProperty("--text", "#d0c9d6");
  style.setProperty("--fg", "#3f3356");
  style.setProperty("--primary", "#6979f8");
  style.setProperty("--success", "#00C48C");
  style.setProperty("--error", "#FF647C");
  style.setProperty("--primary-faded", "#A5AFFB");
};

const Bawd: React.FC = () => {
  const prefersDark = matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = React.useState<boolean>(prefersDark);
  const [popup, setPopup] = React.useState<IPopup>(null);

  const changeDarkMode = (change?: "dark" | "light") => {
    setDark((prev) => {
      const next = change === "dark" ? true : change === "light" ? false : !prev;
      if (next) {
        applyDark();
      } else {
        applyLight();
      }
      return next;
    });
  };

  React.useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const change = e.matches ? "dark" : "light";
      changeDarkMode(change);
    });

    document.addEventListener("popup:toggle", (event: CustomEvent) => {
      setPopup((prev) => !prev ? event.detail : null);
    });
  }, []);

  return (
    <Router>
      <header className={`bg-fg`}>
        <Container>
          <Row>
            <Column width="1/2">
              <Link to={`/`}>
                <Heading tag={`h6`} size={`h4`}>
                  Bawd
                </Heading>
              </Link>
            </Column>
            <Column width="1/2" align="end">
              <Button
                colour="blank"
                onClick={() => changeDarkMode()}
              >
                <Icons.ContrastIcon size={24} />
              </Button>
            </Column>
          </Row>
        </Container>
      </header>
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
      <Popup
        setPopup={setPopup}
        popup={popup}
      />
    </Router>
  );
};

export default Bawd;
