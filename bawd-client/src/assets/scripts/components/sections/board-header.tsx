import * as React from "react";
import { Link } from "react-router-dom";
import { IBoard } from "../../types";
import { togglePopup } from "../../utils";
import { BoardIcon } from "../icons";
import * as Sections from "../sections";
import { Button, Column, Container, Heading, Row, } from "../snippets";

export const BoardHeader: React.FC<{
  board: IBoard;
}> = ({
  board
}) => (
  <div className="bg-primary">
    <Container className="py-4">
      <Row>
        <Column width={`1/2`}>
          <Heading tag="h3">
            <Link
              to={board ? `/boards/${board._source.handle}` : null}
              className={`text-bg ${!board ? "pointer-events-none" : ""}`}
            >
              {board ? board._source.name : "Loading"}
            </Link>
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
    </Container>
  </div>
);
