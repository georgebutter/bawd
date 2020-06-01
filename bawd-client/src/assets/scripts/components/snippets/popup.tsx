import * as React from "react";
import { togglePopup } from "../../utils";
import * as Icon from "../icons";

import Button from "./button";
import Column from "./column";
import Container from "./container";
import Heading from "./heading";
import Row from "./row";

const Popup: React.FC<IProps> = ({ popup }) => {
  return (
    <div className={`fixed inset-0 ${popup ? ` z-20` : `opacity-0 invisible pointer-events-none`}`}>
      <div
        className={`fixed inset-0 bg-bg opacity-50 backdrop-blur`}
        onClick={() => togglePopup(null)}
      />
      <div className={`flex flex-col h-full justify-center p-2 w-full`}>
        <div
          className={`bg-fg max-w-lg min-h-8 mx-auto relative rounded-lg w-full flex flex-col`}
        >
          <Container>
            <Row>
              <Column width="2/3">
                <Heading tag={`h6`}>
                  {popup?.title}
                </Heading>
              </Column>
              <Column width="1/3" align="end">
                <Button
                  colour="blank"
                  onClick={() => togglePopup(null)}
                >
                  <Icon.Close size={24} />
                </Button>
              </Column>
            </Row>
          </Container>
          <div className={`overflow-y-auto`}>
            {popup ? popup.content() : null}
          </div>
        </div>
      </div>
    </div>
  );
};

interface IProps {
  setPopup: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  popup: {
    title: string;
    content: () => React.ReactNode;
  };
}

export default Popup;
