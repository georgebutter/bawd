export interface IBoard {
  _id: string;
  _source: {
    name: string;
    handle: string;
  };
}

export interface IPost {
  _id: string;
  _source: {
    title: string;
    handle: string;
    board: IBoard["_source"];
    post: string;
  };
}
