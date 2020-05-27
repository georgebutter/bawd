import * as React from "react";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { categories, handleize } from "../../../../../../bawd-shared";
import { getBoardByHandle, togglePopup } from "../../utils";
import * as Icon from "../icons";
import {
  Button,
  Column,
  Container,
  Form,
  Input,
  Select
} from "../snippets";

const CreateBoard: React.FC<{
  category: typeof categories[number];
}> = (props) => {
  const history = useHistory();
  const [name, setName] = React.useState<string>("");
  const [category, setCategory] = React.useState<typeof categories[number] | "">(props.category);
  const debouncedName = useDebounce(name, 500);
  const [status, setStatus] = React.useState<string>("disabled");
  React.useEffect(() => {
    (async () => {
      if (name.length > 3) {
        const handle = handleize(name);
        const board = await getBoardByHandle(handle);
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
            category,
            name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const json = await response.json();
        if (json.status === "success") {
          togglePopup(null);
          history.push(`/boards/${json.body.handle}`);
        }
      }}>
        <Column>
          <Input
            name="BoardName"
            label="Choose a name"
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Column>
        {!props.category ? (
          <Column>
            <Select
              label="Category"
              name="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </Column>
        ) : null}
        <Column>
          <Button
            disabled={status === "disabled"}
            type="submit"
          >
            <Icon.Board size={12} />
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
