import { get } from '../axios/api';

export interface Category {
  id: string;
  name: string;
}

export interface CategoryResponse {
  status: string;
  details: Category[];
}

export const getAllCategories = () => get<CategoryResponse>('/category', false);
