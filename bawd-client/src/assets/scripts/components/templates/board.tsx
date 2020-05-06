import * as React from "react";

import {
  useParams,
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
    <Container>
      <Row>
        <Column width={`1/2`}>
          <Heading tag={`h3`}>
            {board ? board._source.name : "Loading"}
          </Heading>
        </Column>
        <Column width={`1/2`} align={`end`}>
          <Button
            onClick={() => togglePopup({
              content: () => <Sections.CreatePost board={board} />,
              title: "Create Post",
            })}
          >
            <BoardIcon size={12} />
            <span className={"ml-1"}>{"Create post"}</span>
          </Button>
        </Column>
      </Row>
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
  ) : null;
};

export default Board;
