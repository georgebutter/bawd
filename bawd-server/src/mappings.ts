export const boards = {
  handle: {
    type: "text"
  },
  name: {
    type: "keyword"
  },
};

export const posts = {
  board: {
    properties: boards,
  },
  handle: {
    type: "text"
  },
  post: {
    type: "text"
  },
  title: {
    type: "keyword"
  },
};
