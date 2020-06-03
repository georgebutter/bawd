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
    score: number;
    upvotes: Array<IPost["_source"]["tripcode"]>;
    downvotes: Array<IPost["_source"]["tripcode"]>;
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

export interface IMetadata {
  oEmbed?: {
    type: "photo" | "video" | "link" | "rich";
    version?: string;
    title?: string;
    author_name?: string;
    author_url?: string;
    provider_name?: string;
    provider_url?: string;
    cache_age?: number;
    thumbnails?: Array<{
      url?: string;
      width?: number;
      height?: number;
    }>;
  };
  twitter_card: {
    card: string
    site?: string
    creator?: string
    creator_id?: string
    title?: string
    description?: string
    players?: Array<{
      url: string;
      stream?: string;
      height?: number;
      width?: number;
    }>
    apps: {
      iphone: {
        id: string;
        name: string;
        url: string;
      };
      ipad: {
        id: string;
        name: string;
        url: string;
      }
      googleplay: {
        id: string;
        name: string;
        url: string;
      }
    };
    images: Array<{
      url: string;
      alt: string;
    }>
  };
  open_graph: {
    title: string
    type: string
    images?: Array<{
      url: string
      secure_url?: string
      type: string
      width: number
      height: number
    }>
    url?: string
    audio?: Array<{
      url: string
      secure_url?: string
      type: string;
    }>;
    description?: string
    determiner?: string
    locale: string
    locale_alt: string
    videos: Array<{
      url: string
      stream?: string
      height?: number
      width?: number
      tags?: string[]
    }>
  };
}

interface IPopup {
  content: () => React.ReactNode;
  title: string;
}
