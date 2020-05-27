import * as React from "react";
import * as Sections from ".";
import { IBoard } from "../../types";
import { togglePopup } from "../../utils";
import * as Icons from "../icons";
import { Button, ElasticList } from "../snippets";

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
        <Button
          colour="sidebar"
          onClick={() => togglePopup({
            content: () => <Sections.CreateBoard category={category} />,
            title: "Create Board",
          })}
        >
          {title ? title : category} <Icons.Plus />
        </Button>
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
    renderNoResults={() => (
      <Button
        colour="sidebar"
        onClick={() => togglePopup({
          content: () => <Sections.CreateBoard category={category} />,
          title: "Create Board",
        })}
      >
        {title ? title : category} <Icons.Plus />
      </Button>
    )}
    renderError={(error: any) => (
      <p className="text-error">{error}</p>
    )}
  />
);

interface IBoardList {
  title?: string;
  category: string;
  query?: any;
}

export { BoardList };
