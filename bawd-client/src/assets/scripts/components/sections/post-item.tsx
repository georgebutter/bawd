import * as marked from "marked";
import * as React from "react";
import { Link } from "react-router-dom";
import { IPost } from "../../types";
import { Column, Heading, Row } from "../snippets";

const PostItem: React.FC<IPost> = ({ _id, _source }) => (
  <Column>
    <div className="w-full bg-fg rounded-md hover:shadow-lg px-2">
      <Row>
        <Column width="1/2">
          <Link
            className="block w-full"
            to={`/boards/${_source.board._source.handle}/${_source.id}/${_source.handle}`}
          >
            <Heading tag="h5">
              {_source.title}
            </Heading>
            <div
              className="text-sm text-faded truncate rte"
              dangerouslySetInnerHTML={{
                __html: marked(_source.post)
              }}
            />
          </Link>
        </Column>
        <Column width="1/2" align="end">
          <Link to={`/boards/${_source.board._source.handle}`} className="bg-primary text-fg px-1 rounded text-xs inline-block">
            {_source.board._source.name}
          </Link>
        </Column>
        <Column>
          <small className="text-xs truncate max-w-full block">
            {"Posted by "}
            <Link
              className="text-primary"
              to={`/user/${_source.tripcode}`}
            >
              {_source.tripcode}
            </Link>
          </small>
        </Column>
      </Row>
    </div>
  </Column>
);

export { PostItem };
