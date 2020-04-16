import * as React from "react";

import {
  Link,
  useParams,
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
import { getBoardByHandle } from "../../utils";
import { BoardIcon, PostIcon } from "../icons";
import * as Sections from "../sections";
import ElasticList from "../snippets/elastic-list";

const Board: React.FC = () => {
  const { boardHandle } = useParams();
  const [board, setBoard] = React.useState<IBoard>(null);
  const [popup, setPopup] = React.useState<React.ReactNode>(null);
  React.useEffect(() => {
    (async () => {
      const theBoard = await getBoardByHandle(boardHandle);
      setBoard(theBoard);
    })();
  }, [boardHandle]);

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Column>
            <Heading tag={`h3`}>
              {board ? board._source.name : "Loading"}
            </Heading>
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

export default Board;
