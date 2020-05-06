import * as React from "react";
import * as Sections from ".";
import { Column, ElasticList, Row } from "../snippets";

import { IPost } from "../../types";

const PostList: React.FC<{
  query?: any;
}> = ({
  query
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
);

export { PostList };
