import axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import { IDiagnosisResponse } from '@/types/api';

const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_SERVER_URL;
const BOARD_BASE_URL = process.env.NEXT_PUBLIC_BOARD_SERVER_URL;

const aiRequest = async (
  data: FormData,
  cancelToken: CancelToken,
): Promise<IDiagnosisResponse[]> => {
  return axios({
    baseURL: AI_BASE_URL,
    method: 'post',
    url: '/inference/',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
    cancelToken,
  }).then((res: AxiosResponse) => res.data?.results);
};

const boardRequest = async <T>(param: AxiosRequestConfig) => {
  return axios({
    baseURL: BOARD_BASE_URL,
    ...param,
  }).then((res: AxiosResponse<T>) => res);
};

export { aiRequest, boardRequest };
