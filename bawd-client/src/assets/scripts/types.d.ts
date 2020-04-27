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
    board: IBoard;
    post: string;
    tripcode: string;
    id: string;
    link: string;
  };
}

interface IPopup {
  content: () => React.ReactNode;
  title: string;
}
