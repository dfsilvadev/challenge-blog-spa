import React from 'react';
import '../../../styles/global-styles.css';

export interface Comment {
  post_id: string;
  conteudo: string;
  autor_nome: string;
}

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <>
      <div className="w-90 sm:w-full p-6 bg-white border border-[#D9D9D9] rounded-xl">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
          {comment.autor_nome}
        </h5>
        <div className="">
          <p className="mb-3 font-normal text-xl text-pretty">
            {comment.conteudo}
          </p>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
