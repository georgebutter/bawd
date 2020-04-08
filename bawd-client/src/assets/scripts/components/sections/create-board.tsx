import * as React from "react";
import { useHistory } from "react-router-dom";
import { BoardIcon } from "../icons";
import {
  Button,
  Column,
  Container,
  Form,
  Heading,
  Input
} from "../snippets";

const CreateBoard: React.FC<{
  setPopup: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}> = ({ setPopup }) => {
  const history = useHistory();
  const [name, setName] = React.useState<string>("");
  return (
    <Container>
      <Form onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/boards`, {
          body: JSON.stringify({
            name
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const json = await response.json();
        if (json.status === "success") {
          setPopup(null);
          history.push(`/boards/${json.body.handle}`);
        }
      }}>
        <Column>
          <Heading tag={`h6`}>
            {"Create a board"}
          </Heading>
        </Column>
        <Column>
          <Input
            name="BoardName"
            label="Choose a name"
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Column>
        <Column>
          <Button>
            <BoardIcon size={12} />
            <span className={"ml-1"}>{"Create board"}</span>
          </Button>
        </Column>
      </Form>
    </Container>
  );
};

export { CreateBoard };
