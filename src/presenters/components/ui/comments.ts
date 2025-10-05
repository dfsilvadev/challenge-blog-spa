export interface CommentResponse {
  status: string;
  details: CommentDetail[] | string;
}

export interface CommentDetail {
  id: string;
  conteudo: string;
  autor_nome: string;
  created_at: string;
  updated_at: string;
  post_id: string;
}

export interface CreateComment {
  autor_nome: string;
  conteudo: string;
  post_id: string;
}
