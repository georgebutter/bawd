import * as React from "react";
import { Link } from "react-router-dom";
import { IBoard } from "../../types";
import { Column } from "../snippets";

const BoardItem: React.FC<IProps> = ({ board }) => (
  <Link className="text-sm text-primary hover:underline" to={`/boards/${board.handle}`} key={board.name}>
    <p>{board.name}</p>
  </Link>
);

export interface IProps {
  board: IBoard["_source"];
}

export { BoardItem };
