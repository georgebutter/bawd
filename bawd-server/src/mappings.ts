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
