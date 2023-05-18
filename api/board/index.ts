import { IGetPost, IPostComment } from '@/types/api';
import { boardRequest } from '../axios';

export const postComment = async (payload: IPostComment) => {
  const res = await boardRequest({
    method: 'post',
    url: '/comment/',
    data: payload,
  });

  return res.data;
};

export const postPost = async (payload: FormData) => {
  const res = await boardRequest({
    method: 'post',
    url: '/post/',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: payload,
  });

  return res.data;
};

export const getSearchedPost = async (search: string) => {
  const res = await boardRequest<IGetPost>({
    method: 'get',
    url: '/post/',
    params: {
      search,
    },
  });

  return res.data;
};
