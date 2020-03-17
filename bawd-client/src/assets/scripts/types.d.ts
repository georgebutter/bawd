export interface IBoard {
  name: string;
  handle: string;
}

export interface IPost {
  _id: string;
  title: string;
  handle: string;
  board: IBoard;
}
