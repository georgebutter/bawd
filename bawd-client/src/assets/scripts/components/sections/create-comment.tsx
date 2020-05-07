import * as React from "react";
import { Button, Column, Container, Form, Input, MarkdownInput, } from "../snippets";

export const CreateComment: React.FC = () => (
  <Container>
    <Form
      onSubmit={() => {
        console.log("submit comment");
      }}
    >
      <Column>
        <MarkdownInput label="Comment" name="Comment" />
      </Column>
      <Column>
        <Input
          label="Signature"
          name="Signature"
          type="password"
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
