import { get, del, patch, post } from '../axios/api';
import type {
  PostResponse,
  CreatePost,
  UpdatePost,
} from '../presenters/components/ui/posts';

const base = '/post';

export const getall = () => get<PostResponse>(base, true);

export const getPostById = (id: string) =>
  get<PostResponse>(base + `/${id}`, false);

export const getPostByUser = (userId: string) =>
  get<PostResponse>(base + `/createdBy/${userId}`, true);

export const getPostFilter = (
  search: number,
  orderBy: string = 'ASC',
  page: number = 1,
  limit: number = 10
) =>
  get<PostResponse>(base + `/filter`, false, {
    search: search,
    orderBy: orderBy,
    page: page,
    limit: limit,
  });

export const create = (postData: CreatePost) =>
  post<PostResponse, CreatePost>(base, postData, true);

export const update = (postData: UpdatePost) =>
  patch<PostResponse, UpdatePost>(base, postData, true);

export const remove = (postId: string) =>
  del<PostResponse>(base + `/${postId}`, true);
