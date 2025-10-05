export interface CommentResponse {
  status: string;
  details: CommentDetail[] | string;
}

export interface CommentDetail {
  id: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  post_id: string;
}

export interface CreateComment {
  author: string;
  content: string;
  post_id: string;
}
