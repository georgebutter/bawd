import * as React from "react";

import { togglePopup } from "../../utils";
import {
  Button,
  Column,
  Container,
  Heading,
  Popup,
  Row,
} from "../snippets";

import { BoardIcon, PostIcon } from "../icons";
import * as Sections from "../sections";

const Boards: React.FC = () => {
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
              onClick={() => togglePopup({
                content: () => <Sections.CreateBoard />,
                title: "Create Board",
              })}
            >
              <BoardIcon size={12} />
              <span className={"ml-1"}>
                {"Create board"}
              </span>
            </Button>
          </Column>
        </Row>
        <Row>
          <Sections.BoardList />
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Boards;
