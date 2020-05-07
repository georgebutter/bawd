import * as marked from "marked";
import * as React from "react";
import ReactPlayer from "react-player";
import {
  useParams,
} from "react-router-dom";

import { IBoard, IPost, } from "../../types";
import { checkImageURL, getBoardByHandle, getPostById, togglePopup, } from "../../utils";
import * as Sections from "../sections";
import {
  Button,
  Column,
  Container,
  Heading,
  Image,
  Row,
} from "../snippets";
import { BoardIcon } from "../icons";

const Post: React.FC = () => {
  const { boardHandle, postId } = useParams();
  const [post, setPost] = React.useState<IPost>(null);
  const [board, setBoard] = React.useState<IBoard>(null);
  React.useEffect(() => {
    (async () => {
      const thePost = await getPostById(postId);
      setPost(thePost);
      const theBoard = await getBoardByHandle(boardHandle);
      setBoard(theBoard);
    })();
  }, []);
  const link = post?._source?.link;
  return (
    <div>
      <Sections.BoardHeader board={board} />
      <Container className="py-4">
        <Row>
          <Column>
            <Heading tag="h2">
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
      <div>
        <Container>
          <Row>
            <Column width="1/2">
              <Heading tag="h3">
                Comments
              </Heading>
            </Column>
            <Column width="1/2" align="end">
              <Button
                onClick={() => togglePopup({
                  content: () => <Sections.CreateComment />,
                  title: "Create Comment",
                })}
              >
                <BoardIcon size={12} />
                <span className={"ml-1"}>{"Comment"}</span>
              </Button>
            </Column>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Post;
