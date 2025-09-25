import React from 'react';
import '../../../styles/global-styles.css';

interface CommentCardProps {
  id: string;
  content: string;
  studentName: string;
}

const CommentCardGrid: React.FC<CommentCardProps> = ({
  content,
  studentName,
}) => {
  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {studentName}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>
      </div>
    </>
  );
};

export default CommentCardGrid;
