import {
  ReactiveBase
} from "@appbaseio/reactivesearch";
import * as React from "react";
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
  return (
    <Container>
      <Form onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/posts.json`, {
          body: JSON.stringify({
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
          />
        </Column>
        <Column>
          <TextArea
            name="PostBody"
            label="Post"
            placeholder="Text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </Column>
        <Column>
          <SearchSelect label={"Choose board"} name={"ChooseBoard"} index="boards"/>
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
