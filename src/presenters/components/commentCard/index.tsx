import React from 'react';
import '../../../styles/global-styles.css';

export interface Comment {
  postId: string;
  content: string;
  studentName: string;
}

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <>
      <div className="w-[300px] sm:w-[300px] md:w-[300px] lg:w-[400px] xl:w-[600px] p-6 bg-white border border-[#D9D9D9] rounded-xl">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
          {comment.studentName}
        </h5>
        <p className="mb-3 font-normal text-1xl">{comment.content}</p>
      </div>
    </>
  );
};

export default CommentCard;
