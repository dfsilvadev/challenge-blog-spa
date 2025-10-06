import type {
  CommentResponse,
  CreateComment,
} from '../presenters/components/ui/comments';
import { get, post } from '../axios/api';

const base = '/post';

export const getPostCommentsByPostId = (id: string) =>
  get<CommentResponse>(base + `/${id}/comments`, false);

export const create = (commentData: CreateComment) =>
  post<CommentResponse, CreateComment>(
    base + `/${commentData.post_id}/comments`,
    commentData,
    false
  );
