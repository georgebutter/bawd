import * as React from "react";
import { Link } from "react-router-dom";
import * as Icon from "../icons";
import * as Sections from "../sections";
import {
  Button,
  Column,
  Container,
  Row,
} from "../snippets";

export const Menu: React.FC<IProps> = ({
  active,
  changeDarkMode,
}) => (
  <aside
    className={`w-64 h-full max-w-full overflow-y-auto fixed md:relative top-0 bg-fg transition-transform ${active ? "" : "translate-x--100"} md:translate-x-0`}
  >
    <Container>
      <Row className="hidden md:flex">
        <Column width="1/2">
          <Link to={`/`} className="flex items-center">
            <Icon.Logo />
          </Link>
        </Column>
        <Column width="1/2" align="end">
          <Button
            colour="blank"
            onClick={() => changeDarkMode()}
          >
            <Icon.Contrast size={24} />
          </Button>
        </Column>
      </Row>
      <Sections.BoardsList />
    </Container>
  </aside>
);

interface IProps {
  active: boolean;
  changeDarkMode: () => void;
}
