import React from 'react';
import CommentCardGrid from '../presenters/components/commentCard';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <CommentCardGrid
        id="1"
        studentName="Fulano de tal"
        content="Muito obrigada pela explicação, prof! ótimo conteúdo gerado pelo gerador de lero lero."
      ></CommentCardGrid>
    </div>
  );
}

export default App;
