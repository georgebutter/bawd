import * as React from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import * as Store from "store";
import { IPost } from "../../types";
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

const UpvotePost: React.FC<{
  post: IPost;
}> = ({ post }) => {
  const [status, setStatus] = React.useState<"ready" | "loading">("ready");
  const [password, setPassword] = React.useState<string>(Store.get("signature") || "");
  const [errors, setErrors] = React.useState<{
    signature: "Please provide a signature"
  }>({
    signature: null,
  });
  const history = useHistory();
  return (
    <Container>
      <Form onSubmit={async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrors({
          signature: null,
        });
        const errs = [];
        if (!password || password === "") {
          const err = "Please provide a signature";
          setErrors((prevErrors) => ({
            ...prevErrors,
            signature: err,
          }));
          errs.push(err);
        }
        if (errs.length) {
          return;
        }
        Store.set("signature", password);
        const response = await fetch(`/api/posts/${post._source.id}/upvote`, {
          body: JSON.stringify({
            password,
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
            name="Signature"
            label="Signature"
            placeholder="Signature"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Column>
        <Column>
          <Button
            type="submit"
          >
            <Icon.ArrowUp size={12} />
            <span className={"ml-1"}>
              {status === "loading" ? "Upvoting post" : "Upvote post"}
            </span>
          </Button>
        </Column>
      </Form>
    </Container>
  );
};

export { UpvotePost };
