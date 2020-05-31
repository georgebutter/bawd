import * as React from "react";
import * as Sections from ".";
import { Button, Column, Container, ElasticList, Heading, Row,  } from "../snippets";

import { IBoard, IPost } from "../../types";
import { togglePopup } from "../../utils";

const PostList: React.FC<{
  query?: any;
  board?: IBoard;
}> = ({
  query,
  board
}) => (
  <ElasticList
    index={`posts`}
    query={query}
    renderLoading={() => (
      <Row>
        <Column>
          <p>Loading...</p>
        </Column>
      </Row>
    )}
    render={(data) => (
      <Container width="xl">
        <Row>
          {data.map((post: IPost) => <Sections.PostItem {...post}  key={post._id} />)}
        </Row>
      </Container>
    )}
    renderNoResults={() => (
      <Row>
        <Column
          className="py-6 text-center"
          vertical="center"
          align="center"
        >
          <div>
            <Heading
              tag="h6"
              size="h1"
            >
              👋
            </Heading>
            <Heading
              tag="h4"
            >
              {"Wow a brand new board! Get started by "}
              <Button
                colour="link"
                onClick={() => togglePopup({
                  content: () => <Sections.CreatePost board={board} />,
                  title: "Create Post",
                })}
              >
                {"creating a post"}
              </Button>
              {"!"}
            </Heading>
          </div>
        </Column>
      </Row>
    )}
    renderError={(error: any) => (
      <Row>
        <Column>
          <p>{JSON.stringify(error)}</p>
        </Column>
      </Row>
    )}
  />
);

export { PostList };
