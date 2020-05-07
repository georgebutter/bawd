import * as marked from "marked";
import * as React from "react";
import ReactPlayer from "react-player";
import {
  useParams
} from "react-router-dom";

import { IPost } from "../../types";
import { checkImageURL, getPostById } from "../../utils";
import {
  Column,
  Container,
  Heading,
  Image,
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
  const link = post?._source?.link;
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
        {link ? (
          <Column>
            {
              ReactPlayer.canPlay(link) ? (
                <ReactPlayer url={link} />
              ) : checkImageURL(link) ? (
                <Image src={link}/>
              ) : (
                <a
                  href={link}
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="text-primary"
                >
                  External link
                </a>
              )
            }
          </Column>
        ) : null}
      </Row>
    </Container>
  );
};

export default Post;
