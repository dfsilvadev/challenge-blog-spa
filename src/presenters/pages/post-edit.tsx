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
      <div className="min-h-screen">
        <main className="max-w-[90%] md:max-w-[80%] text-black mx-auto px-4 py-8">
          <p>Carregando...</p>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen">
      <main className="max-w-[90%] md:max-w-[80%] text-black mx-auto px-4 py-8">
        <button
          onClick={() => navigate(Routes.POSTS)}
          className="cursor-pointer text-blue-600 text-base"
        >
          Home
        </button>
        <span>/Post</span>

        <h1 className="text-4xl md:text-5xl font-bold mt-6">Edite seu post</h1>

        <div className="mt-8">
          <PostForm
            initialValues={initial}
            categories={categories}
            loadingCategories={loading}
            submitLabel="Salvar"
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default PostEdit;
