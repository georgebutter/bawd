import * as marked from "marked";
import * as React from "react";
import {
  useParams
} from "react-router-dom";

import { IPost } from "../../types";
import { getPostById } from "../../utils";
import {
  Column,
  Container,
  Heading,
  Row,
} from "../snippets";

const Post: React.FC = () => {
  const { boardName, postHandle, postId } = useParams();
  const [post, setPost] = React.useState<IPost>(null);
  React.useEffect(() => {
    (async () => {
      const thePost = await getPostById(postId);
      setPost(thePost);
    })();
  }, []);

  return (
    <Container>
      <Row>
        <Column>
          <Heading tag="h3">
            {post ? post._source.title : "Loading"}
          </Heading>
        </Column>
        <Column>
          <div dangerouslySetInnerHTML={{
            __html: post ? marked(post._source.post) : "Loading" }}
          />
        </Column>
      </Row>
    </Container>
  );
};

export default Post;
