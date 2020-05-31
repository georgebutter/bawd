import * as React from "react";

import {
  useParams,
} from "react-router-dom";

import {
  Container,
} from "../snippets";

import { IBoard } from "../../types";
import { getBoardByHandle } from "../../utils";
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
          board={board}
          query={{
            query: {
              match: {
                "board._source.handle": board._source.handle
              }
            }
          }}
        />
      </Container>
    </div>
  ) : null;
};

export default Board;
