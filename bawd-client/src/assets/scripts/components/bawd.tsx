import {
  ReactiveBase, ReactiveList
} from "@appbaseio/reactivesearch";
import * as React from "react";
import { IBoard, IPost } from "../types";
import { BoardIcon, PostIcon } from "./icons";
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
    <React.Fragment>
      <Container>
        <Row>
          <Column>
            <Heading tag={`h1`}>Bawd</Heading>
          </Column>
        </Row>
        <Row>
          <Column width={`1/2`}>
            <Heading tag={`h3`}>
              {`Posts`}
            </Heading>
          </Column>
          <Column width={`1/2`} align={`end`}>
            <Button
              onClick={() => setPopup(<Sections.CreatePost setPopup={setPopup}/>)}
            >
              <PostIcon size={12} />
              <span className={"ml-1"}>{"Create post"}</span>
            </Button>
          </Column>
        </Row>
        <ReactiveBase
          app={`posts`}
          url={BONSAI_URL}
        >
          <ReactiveList
            dataField="post-results"
            componentId="PostResults"
            showResultStats={false}
            render={({
              loading,
              data
            }) => (
              <Row>
                {data.map((post: IPost) => (
                  <Column key={post._id}>
                    <p>{post.title}</p>
                  </Column>
                ))}
              </Row>
            )}
            renderNoResults={() => (
              <Row>
                <Column>
                  <p>No posts found.</p>
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
                  <Column key={board.name}>
                    <p>{board.name}</p>
                  </Column>
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

export default Bawd;
