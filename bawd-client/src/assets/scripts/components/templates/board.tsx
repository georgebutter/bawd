import * as React from "react";

import {
  useParams,
} from "react-router-dom";

import {
  Column,
  Container,
  Row,
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
        <Row className={"py-2"}>
          <Column>
            <Sections.BoardList
              category={board._source.category}
              title={`More boards in ${board._source.category}`}
              query={{
                query: {
                  bool: {
                    must: {
                      term: {
                        "category.keyword": board._source.category
                      }
                    },
                    must_not: {
                      term: {
                        handle: board._source.handle
                      }
                    },
                  }
                }
              }}
            />
          </Column>
        </Row>
      </Container>
    </div>
  ) : null;
};

export default Board;
