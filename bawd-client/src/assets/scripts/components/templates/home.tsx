import * as React from "react";
import * as Sections from "../sections";
import {
  Container,
} from "../snippets";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <Sections.PostList />
      </Container>
    </React.Fragment>
  );
};

export default Home;
