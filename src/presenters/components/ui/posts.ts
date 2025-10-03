export interface PostResponse {
  status: string;
  details: Detail[] | string;
  pagination?: Pagination;
}

export interface Detail {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_name: string;
  category_id: string;
  category_name: string;
}

export interface Pagination {
  total: number;
  totalPages: number;
  registersPerPage: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage: number;
  firstPage: number;
  lastPage: number;
}

export interface CreatePost {
  title: string;
  content: string;
  is_active: boolean;
  user_id: string;
  category_id: string;
}

export interface UpdatePost {
  title: string;
  content: string;
  is_active: boolean;
  category_id: string;
}
