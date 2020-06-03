import * as React from "react";
import * as Store from "store";
import { IPost } from "../../types";
import { togglePopup } from "../../utils";
import * as Icons from "../icons";
import * as Sections from "../sections";

const Row: React.FC<IProps> = ({ children, post }) => {
  const sig = Store.get("signature");
  console.log(post)
  return (
    <div className="text-center">
      <button
        type="button"
        onClick={() => togglePopup({
          content: () => <Sections.VotePost post={post} method="upvote"/>,
          title: "Upvote post",
        })}
        className={`hover:text-success inline-block ${post?._source?.upvotes?.includes(sig) ? "text-success" : ""}`}
      >
        <Icons.ArrowUp />
      </button>
      <div className="relative group">
        <span className="lh-crop block font-semibold text-2xl">
          {post?._source?.score ? post?._source?.score : 0}
        </span>
      </div>
      <button
        type="button"
        className={`hover:text-error inline-block ${post?._source?.downvotes?.includes(sig) ? "text-error" : ""}`}
        onClick={() => togglePopup({
          content: () => <Sections.VotePost post={post} method="downvote" />,
          title: "Downvote post",
        })}
      >
        <Icons.ArrowDown />
      </button>
    </div>
  );
}

interface IProps {
  post: IPost;
}

export default Row;
