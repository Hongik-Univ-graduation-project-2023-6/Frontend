import { IPost } from './board';

export interface IDiagnosisResponse {
  name: string;
  percentage: number;
}

export interface IPagenation {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface IGetPost extends IPagenation {
  results: IPost[];
}

export interface IPostComment {
  comment_post: number;
  username: string;
  content: string;
}
