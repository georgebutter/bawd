import {
  IBoard,
  IPost,
} from "./types";

/**
 * Gets a post from the end point querying by the posts handle
 * @async
 * @function getPostByHandle
 * @param {string} handle The handle of the post you want to retrieve.
 * @version 0.0.1
 * @returns {Promise} A promise representing an IPost
 */
export const getPostByHandle = async (handle: string): Promise<IPost> => {
  const res = await fetch(`/api/posts/${handle}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json.result.body.hits.hits[0];
};

/**
 * Gets a board from the end point querying by the boards handle
 * @async
 * @function getBoardByHandle
 * @param {string} handle The handle of the board you want to retrieve.
 * @version 0.0.1
 * @returns {Promise} A promise representing an IBoard
 */
export const getBoardByHandle = async (handle: string): Promise<IBoard> => {
  const res = await fetch(`/api/boards/${handle}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json.result.body.hits.hits[0];
};
