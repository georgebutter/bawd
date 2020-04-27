import * as React from "react";

import {
  Button,
  Column,
  Container,
  Heading,
  Row,
} from "../snippets";

import { IBoard, IPost } from "../../types";
import { togglePopup } from "../../utils";
import { BoardIcon, PostIcon } from "../icons";
import * as Sections from "../sections";
import ElasticList from "../snippets/elastic-list";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Column width={`1/2`}>
            <Heading tag={`h3`}>
              {`Posts`}
            </Heading>
          </Column>
          <Column width={`1/2`} align={`end`}>
            <Button
              onClick={() => togglePopup({
                content: () => <Sections.CreatePost />,
                title: "Create Post"
              })}
            >
              <PostIcon size={12} />
              <span className={"ml-1"}>
                {"Create post"}
              </span>
            </Button>
          </Column>
        </Row>
        <ElasticList
          index={`posts`}
          renderLoading={() => (
            <Row>
              <Column>
                <p>Loading...</p>
              </Column>
            </Row>
          )}
          render={(data) => (
            <Row>
              {data.map((post: IPost) => <Sections.PostItem {...post}  key={post._id} />)}
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
        <Row>
          <Column width={`1/2`}>
            <Heading tag={`h3`}>
              {`Boards`}
            </Heading>
          </Column>
          <Column width={`1/2`} align={`end`}>
            <Button
              onClick={() => togglePopup({
                content: () => <Sections.CreateBoard />,
                title: "Create Board",
              })}
            >
              <BoardIcon size={12} />
              <span className={"ml-1"}>{"Create board"}</span>
            </Button>
          </Column>
        </Row>
        <Row>
          <Sections.BoardList />
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Home;
