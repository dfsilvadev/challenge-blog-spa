import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData: Post = {
      id: 1,
      title: 'Title',
      content:
        'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes...',
      author: 'Professor X',
      date: '11/09/2025',
    };

    setTimeout(() => {
      setPost(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!post) return <p className="text-center mt-10">Nenhum post encontrado</p>;

  return (
    <div className="min-h-screen">
      {/* header */}
      {/* eu estou em duvida de como vai ficar as imagems */}
      <div className="bg-black h-40 flex items-center justify-center" />

      <main className="max-w-4xl text-black mx-auto px-4 py-8">
        <a href="#" className="text-blue-600 text-base">
          Home
        </a>
        <span>/Post</span>

        <div className="flex justify-between items-center mt-2">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <p className="text-sm ">{post.date}</p>
        </div>

        <p className="text-justify text-base leading-relaxed mt-4 mb-6">
          {post.content}
        </p>
        <p className="text-right italic">Author: {post.author}</p>
      </main>

      {/* espaço de comentario a partir daqui */}
    </div>
  );
}
