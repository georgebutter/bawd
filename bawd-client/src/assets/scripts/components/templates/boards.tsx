import * as React from "react";

import {
  Link,
} from "react-router-dom";

import {
  Button,
  Column,
  Container,
  Heading,
  Popup,
  Row,
} from "../snippets";

import { IBoard, IPost } from "../../types";
import { BoardIcon, PostIcon } from "../icons";
import * as Sections from "../sections";
import ElasticList from "../snippets/elastic-list";

const Home: React.FC = () => {
  const [popup, setPopup] = React.useState<React.ReactNode>(null);
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Column width={`1/2`}>
            <Heading tag={`h3`}>
              {`Boards`}
            </Heading>
          </Column>
          <Column width={`1/2`} align={`end`}>
            <Button
              onClick={() => setPopup(<Sections.CreateBoard setPopup={setPopup}/>)}
            >
              <BoardIcon size={12} />
              <span className={"ml-1"}>{"Create board"}</span>
            </Button>
          </Column>
        </Row>
        <Row>
          <Sections.BoardList />
        </Row>
      </Container>
      <Popup
        setPopup={setPopup}
      >
        {() => popup}
      </Popup>
    </React.Fragment>
  );
};

export default Home;
