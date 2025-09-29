import React from 'react';
import '../../../styles/global-styles.css';

interface CommentCardProps {
  id: number;
  content: string;
  studentName: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ content, studentName }) => {
  return (
    <>
      <div className="w-[300px] sm:w-[300px] md:w-[300px] lg:w-[400px] xl:w-[600px] p-6 bg-white border border-[#D9D9D9] rounded-xl">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-black">
          {studentName}
        </h5>
        <p className="mb-3 font-normal text-2xl">{content}</p>
      </div>
    </>
  );
};

export default CommentCard;
