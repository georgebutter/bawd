import {
  ReactiveBase, ReactiveList
} from "@appbaseio/reactivesearch";
import * as React from "react";
import { IBoard } from "../types";
import { BoardIcon } from "./icons";
import * as Sections from "./sections";

import {
  Button,
  Column,
  Container,
  Heading,
  Popup,
  Row,
} from "./snippets";

declare const BONSAI_URL: string;

const Bawd: React.FC = () => {
  const [popup, setPopup] = React.useState<React.ReactNode>(null);
  return (
    <Container>
      <Row>
        <Column>
          <Heading tag={`h1`}>Bawd</Heading>
        </Column>
      </Row>
      <Row>
        <Column width={`1/2`}>
          <Heading tag={`h3`}>
            {`Boards`}
          </Heading>
        </Column>
        <Column width={`1/2`} align={`end`}>
          <Button
            onClick={() => setPopup(<Sections.CreateBoard setPopup={setPopup}/>)}
          >
            <BoardIcon size={12} />
            <span className={"ml-1"}>{"Create board"}</span>
          </Button>
        </Column>
      </Row>
      <Row>
        <ReactiveBase
          app={`boards`}
          url={BONSAI_URL}
        >
          <ReactiveList
            dataField="results"
            componentId="Results"
          >
            {({
              loading,
              data
            }) => (
              <div>
                {data.map((board: IBoard) => (
                  <span>{board.name}</span>
                ))}
              </div>
            )}
          </ReactiveList>
        </ReactiveBase>
      </Row>
      <Popup
        setPopup={setPopup}
      >
        {() => popup}
      </Popup>
    </Container>
  );
};

export default Bawd;
