import * as React from "react";
import {
  useParams
} from "react-router-dom";

import { IPost } from "../../types";
import { getPostByHandle } from "../../utils";
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
          <p>{post ? post._source.post : "Loading"}</p>
        </Column>
      </Row>
    </Container>
  );
};

export default Post;
