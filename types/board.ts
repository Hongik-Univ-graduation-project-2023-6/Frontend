export interface IImage {
  id: string;
  image_file: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  username: string;
  comments_count: number;
  created_at: Date;
  post_images: IImage[];
}

export interface IComment {
  id: number;
  comment_post: number;
  content: string;
  username: string;
  created_at: Date;
}

export interface IDetailPost extends IPost {
  post_comments: IComment[];
}
