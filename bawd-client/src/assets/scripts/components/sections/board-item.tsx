import * as React from "react";
import { Link } from "react-router-dom";
import { IBoard } from "../../types";
import { Column } from "../snippets";

const BoardItem: React.FC<IProps> = ({ board }) => (
  <Column key={board.name}>
    <Link to={`/boards/${board.handle}`}>
      <p>{board.name}</p>
    </Link>
  </Column>
);

export interface IProps {
  board: IBoard["_source"];
}

export { BoardItem };
