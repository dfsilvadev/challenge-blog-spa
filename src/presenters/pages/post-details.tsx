import React from 'react';
import CommentCard, { type Comment } from '../components/commentCard';

const comments: Comment[] = [];

const PostDetails = () => {
  return (
    //Grid de comentários
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 ">
      {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </div>
  );
};

export default PostDetails;
