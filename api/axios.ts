import axios from 'axios';

const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_SERVER_URL;

const aiRequest = axios.create({
  baseURL: AI_BASE_URL,
});

export { aiRequest };
