import * as React from "react";

import {
  Link,
} from "react-router-dom";

import {
  Button,
  Column,
  Container,
  Heading,
  Popup,
  Row,
} from "../snippets";

import { IBoard, IPost, IPopup } from "../../types";
import { BoardIcon, PostIcon } from "../icons";
import * as Sections from "../sections";
import ElasticList from "../snippets/elastic-list";
import { togglePopup } from "../../utils";

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
              {data.map(({
                _source,
                _id
              }: IPost) => (
                <Column key={_id}>
                  <div className="w-full">
                    <Row>
                      <Column width="1/2">
                        <Link to={`/boards/${_source.board.handle}/${_id}/${_source.handle}`}>
                          <p>{_source.title}</p>
                        </Link>
                      </Column>
                      <Column width="1/2" align="end">
                        <span className="bg-primary text-bg px-1 rounded text-xs inline-block">
                          {_source.board.name}
                        </span>
                      </Column>
                    </Row>
                  </div>
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
