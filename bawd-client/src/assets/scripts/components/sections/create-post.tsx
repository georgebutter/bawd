import * as React from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import * as Store from "store";
import { IBoard, IPost } from "../../types";
import { togglePopup } from "../../utils";
import * as Icon from "../icons";

import {
  Button,
  Column,
  Container,
  Form,
  Input,
  MarkdownInput,
  SearchSelect,
} from "../snippets";

const CreatePost: React.FC<{
  board?: IBoard;
  parent?: IPost["_id"];
}> = (props) => {
  const { parent } = props;
  const [status, setStatus] = React.useState<"ready" | "loading">("ready");
  const [title, setTitle] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");
  const [post, setPost] = React.useState<string>("");
  const [board, setBoard] = React.useState<IBoard>(props.board);
  const [password, setPassword] = React.useState<string>(Store.get("signature") || "");
  const [errors, setErrors] = React.useState<{
    chooseBoard: "Please specify an existing board";
    chooseTitle: "Title cannot be blank",
    choosePost: "Post cannot be blank"
  }>({
    chooseBoard: null,
    choosePost: null,
    chooseTitle: null,
  });
  const history = useHistory();
  return (
    <Container>
      <Form onSubmit={async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrors({
          chooseBoard: null,
          choosePost: null,
          chooseTitle: null,
        });
        const errs = [];
        if (!board) {
          const err = "Please specify an existing board";
          setErrors((prevErrors) => ({
            ...prevErrors,
            chooseBoard: err,
          }));
          errs.push(err);
        }
        if (!title || title === "") {
          const err = "Title cannot be blank";
          setErrors((prevErrors) => ({
            ...prevErrors,
            chooseTitle: err,
          }));
        }
        if (!post || post === "") {
          const err = "Post cannot be blank";
          setErrors((prevErrors) => ({
            ...prevErrors,
            choosePost: err,
          }));
        }
        if (errs.length) {
          return;
        }
        Store.set("signature", password);
        const response = await fetch(`/api/posts`, {
          body: JSON.stringify({
            board,
            link,
            parent,
            password,
            post,
            title,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const json = await response.json();
        if (json.status === "success") {
          setStatus("ready");
          togglePopup(null);
          history.go(0);
        }
      }}>
        <Column>
          <Input
            name="PostTitle"
            label="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.chooseTitle}
          />
        </Column>
        <Column>
          <Input
            name="Link"
            label="Link"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Column>
        {ReactPlayer.canPlay(link) ? (
          <Column>
            <ReactPlayer url={link} />
          </Column>
        ) : null}
        <Column>
          <MarkdownInput
            name="PostBody"
            label="Post"
            placeholder="Text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            error={errors.choosePost}
          />
        </Column>
        {!props.board ? (
          <Column>
            <SearchSelect
              label={"Choose board"}
              name={"ChooseBoard"}
              index="boards"
              onSelect={(asset: IBoard) => setBoard(asset)}
              error={errors.chooseBoard}
            />
          </Column>
        ) : null}
        {Store.get("signature") ? null : (
          <Column>
            <Input
              name="Signature"
              label="Signature"
              placeholder="Signature"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Column>
        )}
        <Column>
          <Button
            type="submit"
          >
            <Icon.Post size={12} />
            <span className={"ml-1"}>
              {status === "loading" ? "Creating post" : "Create post"}
            </span>
          </Button>
        </Column>
      </Form>
    </Container>
  );
};

export { CreatePost };
