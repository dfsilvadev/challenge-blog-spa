import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
};
type PostParams = {
  id: string;
};

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: urlId } = useParams<PostParams>();

  const id = urlId;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setPost(null);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<Post>(
          `http://localhost:3001/posts/${id}`
        );

        setPost(response.data);
      } catch (err) {
        console.error('Erro ao buscar o post:', err);
        setError(
          'Erro ao carregar o post. Verifique se o ID está correto ou se o servidor esta ativo.'
        );
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="min-h-screen">
      <div className="bg-black h-40 flex items-center justify-center" />

      <main className="max-w-4xl text-black mx-auto px-4 py-8">
        <a href="/" className="text-blue-600 text-base">
          Home
        </a>
        <span>/Post: {id ? id.substring(0, 8) + '...' : 'N/A'}</span>

        {error && (
          <div className="text-center mt-10 text-red-600 p-4 border border-red-300 rounded">
            <p className="font-bold text-lg">Post não Encontrado</p>
            <p className="text-sm mt-2 mb-4">{error}</p>

            <a
              href="/"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 no-underline inline-block mt-4"
            >
              Voltar para o Inicio
            </a>
          </div>
        )}
        {!error && !post && (
          <p className="text-center mt-10">Nenhum post encontrado</p>
        )}

        {post && (
          <>
            <div className="flex justify-between items-center mt-6">
              <h1 className="text-5xl font-bold">{post.title}</h1>
              <p className="text-sm ">{post.date}</p>
            </div>

            <p className="text-justify text-base leading-relaxed mt-4 mb-6">
              {post.content}
            </p>
            <p className="text-right italic">Author: {post.author}</p>
          </>
        )}
      </main>
    </div>
  );
}
