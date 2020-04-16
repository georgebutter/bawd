import * as React from "react";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { handleize } from "../../../../../../bawd-shared";
import { getBoardByHandle } from "../../utils";
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
  const debouncedName = useDebounce(name, 500);
  const [status, setStatus] = React.useState<string>("disabled");

  React.useEffect(() => {
    (async () => {
      if (name.length > 3) {
        const handle = handleize(name);
        const board = await getBoardByHandle(handle);
        console.log(board);
        if (!board) {
          setStatus("validated");
        }
      }
    })();
  }, [debouncedName]);

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
          <Button
            disabled={status === "disabled"}
          >
            <BoardIcon size={12} />
            <span className={"ml-1"}>
              {"Create board"}
            </span>
          </Button>
        </Column>
      </Form>
    </Container>
  );
};

export { CreateBoard };
