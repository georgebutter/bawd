export const boards = {
  handle: {
    type: "string"
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
    type: "string"
  },
  post: {
    type: "text"
  },
  title: {
    type: "keyword"
  },
};
