import * as DOMPurify from "dompurify";
import * as marked from "marked";
import * as React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { IPost } from "../../types";
import { checkImageURL } from "../../utils";
import { Column, Heading, Image, PreviewLink, Row,  } from "../snippets";

const PostItem: React.FC<IPost> = ({ _id, _source }) => (
  <Column>
    <div className="w-full bg-fg rounded-md hover:shadow-lg px-2 flex">
      <Row>
        <Column>
          <Link to={`/boards/${_source.board._source.handle}`} className="bg-primary text-fg px-1 rounded text-xs inline-block">
            {_source.board._source.name}
          </Link>
        </Column>
        <Column>
          <Link
            className="block w-full"
            to={`/boards/${_source.board._source.handle}/${_source.id}/${_source.handle}`}
          >
            <Heading tag="h5">
              {_source.title}
            </Heading>
            <div
              className="text-sm text-faded rte"
              dangerouslySetInnerHTML={{
                __html: marked(DOMPurify.sanitize(_source.post))
              }}
            />
          </Link>
        </Column>
        <Column>
          {_source.link ? (
            ReactPlayer.canPlay(_source.link) ? (
              <ReactPlayer url={_source.link} width="100%" />
            ) : checkImageURL(_source.link) ? (
              <Image src={_source.link} fit="cover" className="h-20"/>
            ) : (
              <PreviewLink link={_source.link} />
            )
          ) : null}
        </Column>
        <Column>
          <small className="text-xs max-w-full block">
            {"Posted by "}
            <Link
              className="text-primary"
              to={`/user/${_source.tripcode}`}
              title={_source.tripcode}
            >
              {`${_source.tripcode.substring(0, 8)}...`}
            </Link>
          </small>
        </Column>
      </Row>
    </div>
  </Column>
);

export { PostItem };
