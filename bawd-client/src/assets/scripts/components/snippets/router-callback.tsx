import * as React from "react";
import { withRouter } from "react-router-dom";
import { toggleMenu } from "../../utils";

const RouterCallback = ({ history }: { history: any }): null => {
  React.useEffect(() => {
    const unlisten = history.listen(() => {
      toggleMenu(false);
    });
    return () => {
      unlisten();
    };
  }, []);
  return null;
};

export default withRouter(RouterCallback);
