import * as React from "react";
import ReactPlayer from "react-player";
import { IPost } from "../../types";
import { Button, Column, Container, Form, Input, MarkdownInput, } from "../snippets";
import { togglePopup } from "../../utils";

export const CreateComment: React.FC<{
  parent: IPost["_id"];
}> = ({
  parent
}) => {
  const [status, setStatus] = React.useState<"ready" | "loading">("ready");
  const [link, setLink] = React.useState<string>("");
  const [comment, setComment] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errors, setErrors] = React.useState<{
    comment: "Comment cannot be blank"
  }>({
    comment: null,
  });
  return (
    <Container>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus("loading");
          setErrors({
            comment: null,
          });
          const errs = [];
          if (!comment || comment === "") {
            const err = "Comment cannot be blank";
            setErrors((prevErrors) => ({
              ...prevErrors,
              comment: err,
            }));
          }
          if (errs.length) {
            return;
          }
          const response = await fetch(`/api/comments`, {
            body: JSON.stringify({
              comment,
              link,
              parent,
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
        }}
      >
        <Column>
          <MarkdownInput
            label="Comment"
            name="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            error={errors.comment}
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
          <Input
            label="Signature"
            name="Signature"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Column>
        <Column>
          <Button
            type="submit"
          >
            Comment
          </Button>
        </Column>
      </Form>
    </Container>
  );
};
