import * as React from "react";
import Button from "./button";
import Column from "./column";
import Container from "./container";
import Form from "./form";
import Heading from "./heading";
import { BoardIcon } from "./icons";
import Input from "./input";
import Popup from "./popup";
import Row from "./row";

const Bawd: React.FC = () => {
  const [popup, setPopup] = React.useState<React.ReactNode>(null);
  return (
    <Container>
      <Row>
        <Column>
          <Heading tag={`h1`}>Bawd</Heading>
        </Column>
      </Row>
      <Row>
        <Column width={`1/2`}>
          <Heading tag={`h3`}>
            {`Boards`}
          </Heading>
        </Column>
        <Column width={`1/2`} align={`end`}>
          <Button
            onClick={() => setPopup(<CreateBoard setPopup={setPopup}/>)}
          >
            <BoardIcon size={12} />
            <span className={"ml-1"}>{"Create board"}</span>
          </Button>
        </Column>
      </Row>
      <Popup
        setPopup={setPopup}
      >
        {() => popup}
      </Popup>
    </Container>
  );
};

const CreateBoard: React.FC<{
  setPopup: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}> = ({ setPopup }) => {
  const [name, setName] = React.useState<string>("");
  return (
    <Container>
      <Form onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/boards.json`, {
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
        }
      }}>
        <Column>
          <Heading tag={`h6`}>
            Create a board
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

export default Bawd;
