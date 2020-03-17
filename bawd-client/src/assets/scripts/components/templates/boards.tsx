import {
  ReactiveBase, ReactiveList
} from "@appbaseio/reactivesearch";
import * as React from "react";

import {
  Link,
} from "react-router-dom";

import {
  BoardItem,
  Button,
  Column,
  Container,
  Heading,
  Popup,
  Row,
} from "../snippets";

import { IBoard, IPost } from "../../types";
import { BoardIcon, PostIcon } from "../icons";
import * as Sections from "../sections";

declare const BONSAI_URL: string;

const Home: React.FC = () => {
  const [popup, setPopup] = React.useState<React.ReactNode>(null);
  return (
    <React.Fragment>
      <Container>
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
        <ReactiveBase
          app={`boards`}
          url={BONSAI_URL}
        >
          <ReactiveList
            dataField="results"
            componentId="Results"
            showResultStats={false}
            render={({
              loading,
              data
            }) => (
              <Row>
                {data.map((board: IBoard) => (
                  <BoardItem board={board} key={board.name} />
                ))}
              </Row>
            )}
            renderNoResults={() => (
              <Row>
                <Column>
                  <p>No boards found.</p>
                </Column>
              </Row>
            )}
            renderError={(error: any) => (
              <Row>
                <Column>
                  <p>{error}</p>
                </Column>
              </Row>
            )}
          />
        </ReactiveBase>
      </Container>
      <Popup
        setPopup={setPopup}
      >
        {() => popup}
      </Popup>
    </React.Fragment>
  );
};

export default Home;
