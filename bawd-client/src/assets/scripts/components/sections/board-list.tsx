import * as React from "react";
import { IBoard } from "../../types";
import { BoardItem } from "../sections";
import { Column, ElasticList } from "../snippets";

const BoardList: React.FC = () => {
  return (
    <ElasticList
      index="boards"
      renderLoading={() => (
        <Column>
          <p>Loading...</p>
        </Column>
      )}
      render={(data: any) => (
        <React.Fragment>
          {data.map((board: IBoard) => (
            <BoardItem
              board={board._source}
              key={board._id}
            />
          ))}
        </React.Fragment>
      )}
      renderNoResults={() => (
        <Column>
          <p>No boards found.</p>
        </Column>
      )}
      renderError={(error: any) => (
        <Column>
          <p>{error}</p>
        </Column>
      )}
    />
  );
};

export { BoardList };
