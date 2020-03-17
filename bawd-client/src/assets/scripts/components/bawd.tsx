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
  Boards,
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
    exact: true,
    main: () => <Boards />,
    path: "/boards/:boardHandle",
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
      <Container className={`bg-gray-200`}>
        <Row>
          <Column>
            <Link to={`/`}>
              <Heading tag={`h6`} size={`h4`}>Bawd</Heading>
            </Link>
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
