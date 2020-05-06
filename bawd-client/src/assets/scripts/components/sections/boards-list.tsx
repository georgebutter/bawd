import * as React from "react";
import { categories } from "../../../../../../bawd-shared";
import { BoardList } from "../sections";
import { Column, Row } from "../snippets";

const BoardsList: React.FC = () => (
  <Row>
    {categories.map((cat) => (
      <Column key={cat}>
        <BoardList
          category={cat}
        />
      </Column>
    ))}
  </Row>
);

export { BoardsList };
