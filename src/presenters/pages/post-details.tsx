import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getPostById } from '../../resources/postResources';
import type { Detail } from '../components/ui/posts';
import type { CommentDetail } from '../components/ui/comments';
import { useAuth } from '../../hooks/useAuth';
import CommentForm from '../components/commentForm';
import CommentCard from '../components/commentCard';
import { getPostCommentsByPostId } from '../../resources/commentResources';
import { Routes } from '../router/constants/routesMap';

type PostParams = {
  id: string;
};

export default function PostPage() {
  const [posts, setPosts] = useState<Detail[]>([]);
  const [comments, setComments] = useState<CommentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: urlId } = useParams<PostParams>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const id = urlId;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setPosts([]);
      setComments([]);
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

    const fetchComment = async () => {
      try {
        const response = await getPostCommentsByPostId(id);
        const details = response.data.details;

        if (Array.isArray(details) && details.length > 0) {
          setComments(details);
        } else {
          setComments([]);
        }
      } catch (err) {
        console.error(err);
        setComments([]);
      }
    };

    fetchPost();
    fetchComment();
  }, [id, user]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="min-h-screen">
      <main className="max-w-[80%] text-black mx-auto px-4 py-8">
        <button
          onClick={() => navigate(Routes.POSTS)}
          className="cursor-pointer text-blue-600 text-base"
        >
          Home
        </button>
        <span>/Post</span>

        {error && (
          <div className="text-center mt-10 text-red-600 p-4 border border-red-300 rounded">
            <p className="font-bold text-lg">Post não Encontrado</p>
            <p className="text-sm mt-2 mb-4">{error}</p>
            <button
              onClick={() => navigate(Routes.POSTS)}
              className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 no-underline inline-block mt-4"
            >
              Voltar para o Inicio
            </button>
          </div>
        )}
        {!error && !posts && (
          <p className="text-center mt-10">Nenhum post encontrado</p>
        )}

        {posts && (
          <>
            <div className="flex justify-between items-center mt-6 pt-6">
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
        <div className="pt-6 ">
          <CommentForm id={String(id)}></CommentForm>
        </div>
        <div>
          {/*Grid de comentários*/}
          <div className="grid place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-20">
            {comments.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
