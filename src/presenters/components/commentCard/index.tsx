import { Calendar, User } from 'phosphor-react';
import React from 'react';
import '../../../styles/global-styles.css';

export interface Comment {
  post_id: string;
  content: string;
  author: string;
  created_at?: string;
}

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <User size={24} weight="bold" className="text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-lg font-bold text-gray-900 truncate">
              {comment.author}
            </h5>
            {comment.created_at && (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Calendar size={14} weight="regular" />
                <span>{formatDate(comment.created_at)}</span>
              </div>
            )}
          </div>

          <p className="text-base text-gray-700 leading-relaxed break-words">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
