import {
  IBoard,
  IPost,
} from "./types";

/**
 * Gets a post from the end point querying by the posts id
 * @async
 * @function getPostByid
 * @param {string} id The id of the post you want to retrieve.
 * @version 0.0.1
 * @returns {Promise} A promise representing an IPost
 */
export const getPostById = async (id: string): Promise<IPost> => {
  const res = await fetch(`/api/posts/${id}`, {
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

/**
 * Fire a custom event so that the popup component can be displayed from anywhere.
 * There is only ever one popup on the page this reduces the number of dom elements.
 * @function togglePopup
 * @param {Object} popup The content and the title of the popup to be displayed.
 * @version 0.0.1
 * @returns {Promise} A promise representing an IBoard
 */
export const togglePopup = (popup: {
  content: React.ReactNode;
  title: string;
}): void => {
  const event = new CustomEvent("popup:toggle", {
    detail: popup
  });
  document.dispatchEvent(event);
};

export const toggleMenu = (detail: boolean): void => {
  const event = new CustomEvent("menu:toggle", {
    detail,
  });
  document.dispatchEvent(event);
};

export const checkImageURL = (url: string): boolean => !!url.match(/\.(jpeg|jpg|gif|png)$/);
