import { ArrowLeft, CalendarBlank, Tag, User } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { getPostCommentsByPostId } from '../../resources/commentResources';
import { getPostById } from '../../resources/postResources';
import { getGradientFromCategory } from '../../utils/colorCategory';
import CommentCard from '../components/commentCard';
import CommentForm from '../components/commentForm';
import type { CommentDetail } from '../components/ui/comments';
import type { Detail } from '../components/ui/posts';
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(Routes.POSTS)}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft
            size={20}
            weight="bold"
            className="group-hover:-translate-x-1 transition-transform"
          />
          Voltar para Home
        </button>

        {error && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-l-4 border-red-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="text-red-600"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Post não Encontrado
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate(Routes.POSTS)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
            >
              <ArrowLeft size={20} weight="bold" />
              Voltar para o Início
            </button>
          </div>
        )}

        {!error && !posts && (
          <p className="text-center text-gray-600 mt-10">Carregando...</p>
        )}

        {posts && posts[0] && (
          <>
            {/* Card Principal do Post */}
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-200">
              {/* Header com Metadados */}
              <div
                className={`${getGradientFromCategory(posts[0].category_name || '')} px-8 py-6`}
              >
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm mb-4">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Tag size={16} weight="bold" />
                    <span className="font-medium capitalize">
                      {posts[0].category_name || 'Geral'}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <CalendarBlank size={16} weight="regular" />
                    <span>{formatDate(posts[0].created_at)}</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <User size={16} weight="regular" />
                    <span className="capitalize">{posts[0].user_name}</span>
                  </div>
                </div>

                {/* Título */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight capitalize">
                  {posts[0].title}
                </h1>
              </div>

              {/* Conteúdo do Post */}
              <div className="px-8 py-10">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap capitalize">
                    {posts[0].content}
                  </p>
                </div>
              </div>

              {/* Footer com Autor */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <User size={24} weight="bold" className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Escrito por
                    </p>
                    <p className="text-lg font-bold text-gray-900 capitalize">
                      {posts[0].user_name}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Separador Visual */}
            <div className="relative my-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-2 text-gray-600 font-semibold rounded-full border-2 border-gray-300 shadow-sm">
                  💬 Seção de Comentários
                </span>
              </div>
            </div>
          </>
        )}
        {/* Formulário de Comentário */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <CommentForm id={String(id)} />
        </div>

        {/* Seção de Comentários Existentes */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-white"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
                </svg>
              </span>
              Comentários
            </h2>
            <span className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full text-base shadow-md">
              {comments.length}
            </span>
          </div>

          {comments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comments.map((comment, index) => (
                <CommentCard key={comment.id || index} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    fill="currentColor"
                    className="text-blue-600"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Nenhum comentário ainda
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Seja o primeiro a comentar neste post! Compartilhe suas
                  opiniões e inicie a discussão.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
