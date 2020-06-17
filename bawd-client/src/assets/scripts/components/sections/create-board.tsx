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
  category?: typeof categories[number];
}> = (props) => {
  const history = useHistory();
  const [name, setName] = React.useState<string>("");
  const [warnings, setWarnings] = React.useState<{
    name: "Max length 32 characters" | "Can only contain alphanumeric values";
  }>({
    name: null,
  });
  const [errors, setErrors] = React.useState<{
    name: "A board with this name already exists" | "Must be at least 3 characters";
  }>({
    name: null,
  });
  const [category, setCategory] = React.useState<typeof categories[number] | "">(props.category);
  const debouncedName = useDebounce(name, 500);
  const [status, setStatus] = React.useState<"validated" | "disabled">("disabled");

  React.useEffect(() => {
    (async () => {
      if (name.length > 3) {
        const handle = handleize(name);
        const board = await getBoardByHandle(handle);
        if (!board) {
          setErrors((prev) => ({
            ...prev,
            name: null,
          }));
          return setStatus("validated");
        }
        setStatus("disabled");
        setErrors((prev) => ({
          ...prev,
          name: "A board with this name already exists",
        }));
      } else {
        if (status === "validated") {
          setStatus("disabled");
          setErrors((prev) => ({
            ...prev,
            name: "Must be at least 3 characters",
          }));
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
            error={errors.name}
            warning={warnings.name}
            onChange={(e) => {
              const { value } = e.target;
              if (/[^a-zA-Z0-9]/.test(value)) {
                return setWarnings((prev) => ({
                  ...prev,
                  name: "Can only contain alphanumeric values",
                }));
              }
              if (e.target.value.length > 32) {
                return setWarnings((prev) => ({
                  ...prev,
                  name: "Max length 32 characters",
                }));
              }
              setWarnings((prev) => ({
                ...prev,
                name: null,
              }));
              setName(e.target.value);
            }}
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
