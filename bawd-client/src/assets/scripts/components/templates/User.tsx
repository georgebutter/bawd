import * as React from "react";
import { useParams } from "react-router-dom";
import * as Sections from "../sections";
import {
  Column,
  Container,
  Heading,
  Row,
} from "../snippets";

const User: React.FC = () => {
  const { user } = useParams();
  return (
    <Container>
      <Row>
        <Column>
          <Heading tag="h6" className="break-all">
            {user}
          </Heading>
        </Column>
      </Row>
      
      <Sections.PostList
        query={{
          query: {
            match: {
              tripcode: user,
            }
          }
        }}
      />
    </Container>
  );
};

export default User;
