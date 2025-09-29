import React from 'react';
import '../../../styles/global-styles.css';
import CommentCard from '../commentCard';

const comments = [
  {
    id: 1,
    studentName: 'Aluno 1',
    content: 'Descrição do comentário genérico',
  },
  {
    id: 2,
    studentName: 'Aluno 2',
    content: 'Descrição do comentário genérico',
  },
  {
    id: 3,
    studentName: 'Aluno 3',
    content: 'Descrição do comentário genérico',
  },
];

const CommentCardGrid: React.FC = () => {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 ">
        {comments.map((comment, index) => (
          <CommentCard
            id={index}
            studentName={comment.studentName}
            content={comment.content}
          />
        ))}
      </div>
    </>
  );
};
export default CommentCardGrid;
