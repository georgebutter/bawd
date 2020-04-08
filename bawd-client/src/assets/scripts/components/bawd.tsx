import * as React from "react";
import * as Icons from "./icons";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom";

import {
  Column,
  Container,
  Heading,
  Row,
  Button,
} from "./snippets";

import {
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
    path: "/boards/:boardHandle",
  },
  {
    exact: true,
    main: () => <Post />,
    path: "/boards/:boardHandle/:postHandle",
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
  style.setProperty("--text", "#1a051d");
  style.setProperty("--fg", "#ece9f1");
};
const applyDark = () => {
  const { style } = document.documentElement;
  style.setProperty("--bg", "#3f3356");
  style.setProperty("--text", "#d0c9d6");
  style.setProperty("--fg", "#1a051d");
};

const Bawd: React.FC = () => {
  const prefersDark = matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = React.useState<boolean>(prefersDark);

  const changeDarkMode = (change?: "dark" | "light") => {
    setDark((prev) => {
      console.log(change)
      const next = change === "dark" ? true : change === "light" ? false : !prev;
      console.log(next);
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
      console.log(e);
      const change = e.matches ? "dark" : "light";
      changeDarkMode(change);
    });
  }, []);

  return (
    <Router>
      <header className={`bg-fg`}>
        <Container>
          <Row>
            <Column width="1/2">
              <Link to={`/`}>
                <Heading tag={`h6`} size={`h4`}>Bawd</Heading>
              </Link>
            </Column>
            <Column width="1/2" align="end">
              <Button
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
    </Router>
  );
};

export default Bawd;
