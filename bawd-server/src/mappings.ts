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
  id: {
    type: "text"
  },
  post: {
    type: "text"
  },
  title: {
    type: "keyword"
  },
  tripcode: {
    type: "text"
  },
};

export const comments = {
  handle: {
    type: "text"
  },
  id: {
    type: "text"
  },
  parent: {
    type: "text"
  },
  post: {
    type: "text"
  },
  tripcode: {
    type: "text"
  },
};
