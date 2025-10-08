import { ArrowLeft, PencilSimple } from 'phosphor-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useCategories } from '../../hooks/useCategories';
import { useToast } from '../../hooks/useToast';
import { create } from '../../resources/postResources';
import { PostForm, type PostFormValues } from '../components/postForm/PostForm';
import type { CreatePost } from '../components/ui/posts';
import { Routes } from '../router/constants/routesMap';

const PostCreate = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { categories, loading: loadingCategories } = useCategories();

  const handleSubmit = async (values: PostFormValues) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const payload: CreatePost = {
        title: values.title,
        content: values.content,
        is_active: true,
        user_id: user.id,
        category_id: values.category,
      };

      await create(payload);
      showToast({ type: 'success', message: 'Post criado com sucesso!' });
      navigate(Routes.POSTS);
    } catch {
      showToast({ type: 'error', message: 'Erro ao criar post.' });
    }
  };

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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <PencilSimple size={28} weight="bold" className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Criar Novo Post
              </h1>
              <p className="text-gray-600 mt-1">
                Compartilhe suas ideias com a comunidade
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <PostForm
            initialValues={{ title: '', category: '', content: '' }}
            categories={categories}
            loadingCategories={loadingCategories}
            submitLabel="Publicar Post"
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default PostCreate;
