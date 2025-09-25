import React from 'react';
import '../../../styles/global-styles.css';

interface CommentCardProps {
  id: string;
  content: string;
  studentName: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ content, studentName }) => {
  return (
    <>
      <div className="w-[300px] sm:w-[300px] md:w-[300px] lg:w-[400px] xl:w-[600px] p-6 bg-white border border-border-gray-700 rounded-lg shadow-sm">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
          {studentName}
        </h5>
        <p className="mb-3 font-normal text-lg">{content}</p>
      </div>
    </>
  );
};

export default CommentCard;
