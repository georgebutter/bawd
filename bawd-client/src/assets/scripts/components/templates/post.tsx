import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";
import {
  useParams,
} from "react-router-dom";

import { IBoard, IComment, IPost, } from "../../types";
import { checkImageURL, getBoardByHandle, getMarkdown, getPostById, togglePopup, } from "../../utils";
import * as Icon from "../icons";
import * as Sections from "../sections";
import {
  Button,
  Column,
  Container,
  Counter,
  ElasticList,
  Heading,
  Image,
  PreviewLink,
  Row,
} from "../snippets";

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
          <Column width="auto">
            {post ? (
              <Counter post={post}/>
            ) : null}
          </Column>
          <Column width="auto" vertical="center">
            <Heading tag="h2">
              {post ? post._source.title : "Loading"}
            </Heading>
          </Column>
        </Row>
        <Row>
          <Column>
            {post ? <ReactMarkdown source={getMarkdown(post._source.post)} /> : null}
          </Column>
          {link ? (
            <Column>
              {
                ReactPlayer.canPlay(link) ? (
                  <ReactPlayer url={link} />
                ) : checkImageURL(link) ? (
                  <Image src={link} />
                ) : (
                  <PreviewLink link={link} />
                )
              }
            </Column>
          ) : null}
        </Row>
      </Container>
      <div className="py-2 border-t border-faded">
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
                  content: () => <Sections.CreateComment parent={postId} />,
                  title: "Create Comment",
                })}
              >
                <Icon.Comment size={12} />
                <span className={"ml-1"}>{"Comment"}</span>
              </Button>
            </Column>
          </Row>
          <ElasticList
            index="comments"
            query={{
              query: {
                bool: {
                  must: {
                    term: {
                      parent: postId
                    },
                  },
                },
              },
            }}
            render={(data) => (
              <Row>
                {data.map((comment: IComment) => (
                  <Column>
                    <div>
                      <ReactMarkdown source={getMarkdown(comment._source.comment)} />
                      <small className="text-xs">{comment._source.tripcode}</small>
                    </div>
                  </Column>
                ))}
              </Row>
            )}
            renderError={(err) => (
              <p>{err}</p>
            )}
            renderNoResults={() => (
              <p>No comments created yet...</p>
            )}
          />
        </Container>
      </div>
    </div>
  );
};

export default Post;
