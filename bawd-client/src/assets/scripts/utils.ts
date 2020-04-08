import { IPost } from "./types";

/**
 * Gets a post from the end point querying by the posts handle
 * @async
 * @function getPostByHandle
 * @param {string} handle The handle of the post you want to retrieve.
 * @version 0.0.1
 * @returns {Promise} A promise representing an IPost
 */
export const getPostByHandle = async (handle: string): Promise<IPost> => {
  console.log(handle);
  const res = await fetch(`/api/posts/${handle}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  const json = await res.json();
  return json.result.body.hits.hits[0];
};
