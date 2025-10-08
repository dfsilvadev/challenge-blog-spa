import axios from 'axios';
import type {
  CommentResponse,
  CreateComment,
} from '../presenters/components/ui/comments';

const COMMENTS_API_URL = 'http://localhost:3000';

const CommentsApi = axios.create({
  baseURL: COMMENTS_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

const base = '/post';

export const getPostCommentsByPostId = async (id: string) => {
  const response = await CommentsApi.get<CommentResponse>(
    `${base}/${id}/comments`
  );
  return { data: response.data, status: response.status };
};

export const create = async (postId: string, commentData: CreateComment) => {
  const response = await CommentsApi.post<CommentResponse>(
    `${base}/${postId}/comments`,
    commentData
  );
  return { data: response.data, status: response.status };
};
