import * as React from "react";
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
} from "./snippets";

import {
  Error,
  Home,
} from "./templates";

const routes = [
  {
    exact: true,
    main: () => <Home />,
    path: "/",
  },
  {
    exact: false,
    main: () => <Error />,
    path: "*",
  },
];

const Bawd: React.FC = () => {
  return (
    <Router>
      <Container>
        <Row>
          <Column>
            <Heading tag={`h1`}>Bawd</Heading>
          </Column>
        </Row>
      </Container>
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
