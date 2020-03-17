import * as React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom";

import {
  Home
} from "./templates";

const routes = [
  {
    exact: true,
    main: () => <Home />,
    path: "/",
  },
];

const Bawd: React.FC = () => {
  return (
    <Router>
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
