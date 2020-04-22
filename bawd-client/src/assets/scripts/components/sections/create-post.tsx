import * as React from "react";
import { IBoard } from "../../types";
import { togglePopup } from "../../utils";
import { PostIcon } from "../icons";
import {
  Button,
  Column,
  Container,
  Form,
  Input,
  SearchSelect,
  MarkdownInput,
} from "../snippets";

const CreatePost: React.FC = () => {
  const [status, setStatus] = React.useState<"ready" | "loading">("ready");
  const [title, setTitle] = React.useState<string>("");
  const [post, setPost] = React.useState<string>("");
  const [board, setBoard] = React.useState<IBoard>(null);
  const [password, setPassword] = React.useState<string>("");
  const [errors, setErrors] = React.useState<{
    chooseBoard: "Please specify an existing board";
    chooseTitle: "Title cannot be blank",
    choosePost: "Post cannot be blank"
  }>({
    chooseBoard: null,
    choosePost: null,
    chooseTitle: null,
  });
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
        const response = await fetch(`/api/posts`, {
          body: JSON.stringify({
            board,
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
            name="Password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Column>
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
        <Column>
          <SearchSelect
            label={"Choose board"}
            name={"ChooseBoard"}
            index="boards"
            onSelect={(asset: IBoard) => setBoard(asset)}
            error={errors.chooseBoard}
          />
        </Column>
        <Column>
          <Button
            type="submit"
          >
            <PostIcon size={12} />
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
