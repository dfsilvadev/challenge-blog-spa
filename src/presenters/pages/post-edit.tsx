import { ArrowLeft, NotePencil } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useCategories } from '../../hooks/useCategories';
import { useToast } from '../../hooks/useToast';
import { getPostById, update } from '../../resources/postResources';
import { PostForm, type PostFormValues } from '../components/postForm/PostForm';
import type { Detail, UpdatePost } from '../components/ui/posts';
import { Routes } from '../router/constants/routesMap';

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { categories, loading } = useCategories();
  const [initial, setInitial] = useState<{
    title: string;
    category: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const postRes = await (id
          ? getPostById(id)
          : Promise.reject(new Error('id inválido')));
        if (!mounted) return;

        const details = postRes.data.details;
        let post: Detail | null = null;
        if (Array.isArray(details)) post = details[0] ?? null;
        else if (details && typeof details === 'object')
          post = details as Detail;

        if (!post) throw new Error('Post não encontrado');
        if (user && post.user_id !== user.id)
          throw new Error('Sem permissão para editar');

        setInitial({
          title: post.title,
          category: post.category_id,
          content: post.content,
        });
      } catch {
        showToast({
          type: 'error',
          message: 'Erro ao carregar dados do post.',
        });
        navigate(Routes.POSTS);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id, navigate, showToast, user]);

  const handleSubmit = async (values: PostFormValues) => {
    try {
      if (!id) throw new Error('ID inválido');
      const payload: UpdatePost = {
        id,
        title: values.title,
        content: values.content,
        is_active: true,
        category_id: values.category,
      };
      await update(payload);
      showToast({ type: 'success', message: 'Post atualizado com sucesso!' });
      navigate(Routes.POSTS);
    } catch {
      showToast({ type: 'error', message: 'Erro ao atualizar post.' });
    }
  };

  if (!initial)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg">
                Carregando dados do post...
              </p>
            </div>
          </div>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-4xl mx-auto px-4 py-8">
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

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
              <NotePencil size={28} weight="bold" className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Editar Post
              </h1>
              <p className="text-gray-600 mt-1">
                Atualize seu conteúdo e mantenha-o sempre relevante
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <PostForm
            initialValues={initial}
            categories={categories}
            loadingCategories={loading}
            submitLabel="Salvar Alterações"
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default PostEdit;
