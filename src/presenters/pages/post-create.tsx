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
    <div className="min-h-screen">
      <main className="max-w-[90%] md:max-w-[80%] text-black mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <button
          onClick={() => navigate(Routes.POSTS)}
          className="cursor-pointer text-blue-600 text-base"
        >
          Home
        </button>
        <span>/Post</span>

        <h1 className="text-4xl md:text-5xl font-bold mt-6">Crie seu post</h1>

        <div className="mt-8">
          <PostForm
            initialValues={{ title: '', category: '', content: '' }}
            categories={categories}
            loadingCategories={loadingCategories}
            submitLabel="Enviar"
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default PostCreate;
