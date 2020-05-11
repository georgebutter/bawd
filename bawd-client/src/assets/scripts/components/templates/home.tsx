import * as React from "react";

import {
  Button,
  Column,
  Container,
  Heading,
  Row,
} from "../snippets";

import { togglePopup } from "../../utils";
import * as Icon from "../icons";
import * as Sections from "../sections";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Column width={`1/2`}>
            <Heading tag={`h3`}>
              {`Posts`}
            </Heading>
          </Column>
          <Column width={`1/2`} align={`end`}>
            <Button
              onClick={() => togglePopup({
                content: () => <Sections.CreatePost />,
                title: "Create Post"
              })}
            >
              <Icon.Post size={12} />
              <span className={"ml-1"}>
                {"Create post"}
              </span>
            </Button>
          </Column>
        </Row>
        <Sections.PostList />
        <Row>
          <Column width={`1/2`}>
            <Heading tag={`h3`}>
              {`Boards`}
            </Heading>
          </Column>
          <Column width={`1/2`} align={`end`}>
            <Button
              onClick={() => togglePopup({
                content: () => <Sections.CreateBoard />,
                title: "Create Board",
              })}
            >
              <Icon.Board size={12} />
              <span className={"ml-1"}>
                {"Create board"}
              </span>
            </Button>
          </Column>
        </Row>
        <Sections.BoardsList />
      </Container>
    </React.Fragment>
  );
};

export default Home;
