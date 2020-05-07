import * as React from "react";

import {
  useParams, Link,
} from "react-router-dom";

import {
  Button,
  Column,
  Container,
  Heading,
  Row,
} from "../snippets";

import { IBoard } from "../../types";
import { getBoardByHandle, togglePopup } from "../../utils";
import { BoardIcon } from "../icons";
import * as Sections from "../sections";

const Board: React.FC = () => {
  const { boardHandle } = useParams();
  const [board, setBoard] = React.useState<IBoard>(null);
  React.useEffect(() => {
    (async () => {
      const theBoard = await getBoardByHandle(boardHandle);
      setBoard(theBoard);
    })();
  }, [boardHandle]);

  return board ? (
    <div>
      <Sections.BoardHeader board={board} />
      <Container>
        <Sections.PostList
          query={{
            query: {
              match: {
                "board._source.handle": board._source.handle
              }
            }
          }}
        />
        <Row className={"py-2"}>
          <Column>
            <Sections.BoardList
              category={board._source.category}
              title={`More boards in ${board._source.category}`}
            />
          </Column>
        </Row>
      </Container>
    </div>
  ) : null;
};

export default Board;
