export interface IBoard {
  _id: string;
  _source: {
    name: string;
    handle: string;
    category: string;
  };
}

export interface IPost {
  _id: string;
  _source: {
    title: string;
    handle: string;
    board: IBoard;
    post: string;
    tripcode: string;
    id: string;
    link: string;
  };
}
export interface IComment {
  _id: string;
  _source: {
    comment: string;
    tripcode: string;
    id: string;
    link: string;
    parent: IPost["_id"];
  };
}

interface IPopup {
  content: () => React.ReactNode;
  title: string;
}
