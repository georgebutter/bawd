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
  const { boardHandle, postHandle } = useParams();
  const [post, setPost] = React.useState<IPost>(null);
  React.useEffect(() => {
    (async () => {
      const thePost = await getPostByHandle(postHandle);
      console.log(thePost);
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
      </Row>
    </Container>
  );
};

export default Post;
