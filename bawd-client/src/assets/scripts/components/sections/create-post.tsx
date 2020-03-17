import * as React from "react";
import { IBoard } from "../../types";
import { PostIcon } from "../icons";
import {
  Button,
  Column,
  Container,
  Form,
  Heading,
  Input,
  SearchSelect,
  TextArea
} from "../snippets";

const CreatePost: React.FC<{
  setPopup: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}> = ({ setPopup }) => {
  const [title, setTitle] = React.useState<string>("");
  const [post, setPost] = React.useState<string>("");
  const [board, setBoard] = React.useState<IBoard>(null);
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
        const response = await fetch(`/api/posts.json`, {
          body: JSON.stringify({
            board,
            post,
            title
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const json = await response.json();
        if (json.status === "success") {
          setPopup(null);
        }
      }}>
        <Column>
          <Heading tag={`h6`}>
            {"Create a post"}
          </Heading>
        </Column>
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
          <TextArea
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
          <Button>
            <PostIcon size={12} />
            <span className={"ml-1"}>{"Create post"}</span>
          </Button>
        </Column>
      </Form>
    </Container>
  );
};

export { CreatePost };
