import * as React from "react";
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
} from "../snippets";

const VotePost: React.FC<{
  post: IPost;
  method: "upvote" | "downvote";
}> = ({ post, method }) => {
  const [status, setStatus] = React.useState<"ready" | "loading">("ready");
  const [password, setPassword] = React.useState<string>(Store.get("signature") || "");
  const [errors, setErrors] = React.useState<{
    signature: "Please provide a signature"
  }>({
    signature: null,
  });
  const activeMessage = method === "upvote" ? "Upvoting post" : "Downvoting post";
  const buttonText = method === "upvote" ? "Upvote post" : "Downvote post";
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
        const response = await fetch(`/api/posts/${post._source.id}/${method}`, {
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
            error={errors.signature}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Column>
        <Column>
          <Button
            type="submit"
          >
            {method === "upvote" ? (
              <Icon.ArrowUp size={12} />
            ) : (
              <Icon.ArrowDown size={12} />
            )}
            <span className={"ml-1"}>
              {status === "loading" ? activeMessage : buttonText}
            </span>
          </Button>
        </Column>
      </Form>
    </Container>
  );
};

export { VotePost };
