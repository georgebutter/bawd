import * as React from "react";
import {
  useParams
} from "react-router-dom";

import { IPost } from "../../types";
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
  //   (async () => {
  //     const res = await fetch(`/posts/_search`, {
  //       body: JSON.stringify({
  //         query: {
  //           match: {
  //             handle: "new-post"
  //           }
  //         }
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "GET",
  //     });
  //     const json = await res.json();
  //     console.log(json);
  //   })();
    console.log(boardHandle, postHandle);
  }, []);

  return (
    <Container>
      <Row>
        <Column>
          <Heading tag="h3">
            {`Post`}
          </Heading>
        </Column>
      </Row>
    </Container>
  );
};

export default Post;
