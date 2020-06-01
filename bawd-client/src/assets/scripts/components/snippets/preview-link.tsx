import * as React from "react";
import { Heading, Image } from ".";
import { getPreview } from "../../utils";

const PreviewLink: React.FC<IProps> = ({ link }) => {
  const [preview, setPreview] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const thePreview = await getPreview(link);
      setPreview(thePreview);
    })();
  }, []);
  console.log(preview);
  return (
    <a
      href={link}
      target="_blank"
      rel="nofollow noreferrer"
      className="text-primary block rounded p-2 border border-faded hover:border-primary w-full"
    >
      {preview ? (
        <div>
          <div>
            <Image src={preview.favicon} className="inline-block"/>
            <span
              className="ml-2 bg-primary text-fg px-1 rounded text-xs inline-block"
            >
              {preview.open_graph.site_name}
            </span>
          </div>
          {preview.open_graph.images ? (
            <Image src={preview.open_graph.images[0].url} />
          ) : null}
          <Heading tag="h4">{preview.open_graph.title}</Heading>
        </div>
      ) : "External link"}
    </a>
  );
};

interface IProps {
  link: string;
}

export default PreviewLink;
