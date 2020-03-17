import * as React from "react";
import {
  Column,
  Container,
  Heading,
  Row,
} from "../snippets";

const Error: React.FC = () => {
  return (
    <Container>
      <Row>
        <Column>
          <Heading tag="h1">
            {`This page could not be found!`}
          </Heading>
        </Column>
      </Row>
    </Container>
  );
};

export default Error;
