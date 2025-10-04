import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPostById } from '../../resources/postResources';
import type { Detail } from '../components/ui/posts';
import { useAuth } from '../../hooks/useAuth';

type PostParams = {
  id: string;
};

export default function PostPage() {
  const [posts, setPosts] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: urlId } = useParams<PostParams>();
  const { user } = useAuth();

  console.log(user);

  const id = urlId;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setPosts([]);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getPostById(id);
        const details = res.data.details;

        let firstPost: Detail | null = null;

        if (Array.isArray(details) && details.length > 0) {
          const filtered = user
            ? details.filter((post: Detail) => post.user_id === user.id)
            : details;

          firstPost = filtered.length > 0 ? filtered[0] : null;
        } else if (
          details &&
          typeof details === 'object' &&
          !Array.isArray(details) &&
          'id' in details &&
          'title' in details &&
          'content' in details
        ) {
          firstPost = details as Detail;
        } else if (typeof details === 'string') {
          setError(details);
        } else {
          setError('Resposta do servidor em formato inesperado.');
        }

        setPosts(firstPost ? [firstPost] : []);
      } catch (err) {
        console.error('Erro ao buscar o post:', err);
        setError(
          'Erro ao carregar o post. Verifique se o ID está correto ou se o servidor está ativo.'
        );
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="min-h-screen">
      <main className="max-w-[80%] text-black mx-auto px-4 py-8">
        <a href="/" className="text-blue-600 text-base">
          Home
        </a>
        <span>/Post</span>

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
        {!error && !posts && (
          <p className="text-center mt-10">Nenhum post encontrado</p>
        )}

        {posts && (
          <>
            <div className="flex justify-between items-center mt-6">
              <h1 className="text-4xl md:text-5xl font-bold capitalize">
                {posts[0]?.title}
              </h1>
              <p className="text-sm ">
                {new Date(posts[0]?.created_at)
                  .toLocaleString('pt-BR')
                  .replace(',', '')}
              </p>
            </div>

            <p className="text-justify text-base leading-relaxed mt-4 mb-6 capitalize">
              {posts[0]?.content}
            </p>
            <p className="text-right italic capitalize">
              Author: {posts[0]?.user_name}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
