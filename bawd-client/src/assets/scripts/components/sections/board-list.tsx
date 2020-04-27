import * as React from "react";
import { categories } from "../../../../../../bawd-shared"
import { IBoard } from "../../types";
import { BoardItem } from "../sections";
import { Column, ElasticList, Heading, Row } from "../snippets";

const BoardList: React.FC = () => (
  <Row>
    <ElasticList
      index="boards"
      renderLoading={() => (
        <Column>
          <p>Loading...</p>
        </Column>
      )}
      render={(data: IBoard[]) => (
        <React.Fragment>
          {categories.map((cat) => (
            <Column>
              <Heading tag="h5" className="w-full">
                {cat}
              </Heading>
              <ul className="w-full">
                {data.filter((board) => board._source.category === cat).map((board) => (
                  <li>
                    <BoardItem
                      board={board._source}
                      key={board._id}
                    />
                  </li>
                ))}
              </ul>
            </Column>
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
  </Row>
);

export { BoardList };
