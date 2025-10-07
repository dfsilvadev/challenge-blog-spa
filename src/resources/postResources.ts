import { del, get, patch, post } from '../axios/api';
import type {
  CreatePost,
  PostResponse,
  UpdatePost,
} from '../presenters/components/ui/posts';

const base = '/post';

export const getall = () => get<PostResponse>(base, true);

export const getPaged = (
  page: number,
  limit: number = 10,
  orderBy: string = 'ASC'
) => get<PostResponse>(base, true, { page, limit, orderBy });

export const getPostById = (id: string) =>
  get<PostResponse>(base + `/${id}`, false);

export const getPostByUser = (userId: string) =>
  get<PostResponse>(base + `/createdBy/${userId}`, true);

export const getPostByUserPaged = (
  userId: string,
  page: number,
  limit: number = 10,
  orderBy: string = 'ASC'
) =>
  get<PostResponse>(base + `/createdBy/${userId}`, true, {
    page,
    limit,
    orderBy,
  });

export const getPostFilter = (
  search: string,
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
