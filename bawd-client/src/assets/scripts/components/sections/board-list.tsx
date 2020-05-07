import * as React from "react";
import * as Sections from ".";
import { IBoard } from "../../types";
import { ElasticList, Heading } from "../snippets";

const BoardList: React.FC<IBoardList> = ({
  title,
  category,
  query,
}) => (
  <ElasticList
    index="boards"
    query={query ? query : {
      query: {
        match: {
          category
        }
      }
    }}
    render={(boards: IBoard[]) => (
      <React.Fragment>
        <Heading tag="h6" className="w-full">
          {title ? title : category}
        </Heading>
        <ul className="w-full">
          {boards.map((board) => (
            <li key={board._id}>
              <Sections.BoardItem
                board={board._source}
              />
            </li>
          ))}
        </ul>
        </React.Fragment>
    )}
    renderError={(error: any) => (
      <p>{JSON.stringify(error)}</p>
    )}
  />
);

interface IBoardList {
  title?: string;
  category: string;
  query?: any;
}

export { BoardList };
