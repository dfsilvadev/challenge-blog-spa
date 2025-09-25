import React from 'react';
import CommentCardGrid from '../presenters/components/commentCardGrid';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <h1>Blog Challenge - SPA</h1>
      <CommentCardGrid
        id="1"
        studentName="aaaa"
        content="aaaaaaaaa"
      ></CommentCardGrid>
    </div>
  );
}

export default App;
