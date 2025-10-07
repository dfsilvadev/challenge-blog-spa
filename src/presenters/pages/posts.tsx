import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getErrorMessage } from '../../axios/api';
import { useAuth } from '../../hooks/useAuth';
import { useFilteredPosts } from '../../hooks/useFilteredPosts';
import { useToast } from '../../hooks/useToast';
import {
  getPaged,
  getPostByUserPaged,
  remove,
} from '../../resources/postResources';
import { PostsGrid } from '../components/postcard/PostsGrid';
import { PostsHeader } from '../components/postcard/PostsHeader';
import { PostsPagination } from '../components/postcard/PostsPagination';
import type { Detail, Pagination, PostResponse } from '../components/ui/posts';
import { Routes } from '../router/constants/routesMap';

const Posts = () => {
  const [posts, setPosts] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('ASC');
  const [isLandscape, setIsLandscape] = useState(false);
  const registersPerPage = 10;

  const { user, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { filteredPosts, search, setSearch, setSelectedCategory } =
    useFilteredPosts(posts);

  useEffect(() => {
    fetchPosts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, user?.id, isLoggedIn]);

  const fetchPosts = async (page: number = 1, searchTerm: string = '') => {
    setLoading(true);
    try {
      const hasSearch = !!searchTerm && searchTerm.trim().length > 0;

      if (hasSearch) {
        const { getPostFilter } = await import('../../resources/postResources');
        const res = await getPostFilter(
          searchTerm,
          orderBy,
          page,
          registersPerPage
        );
        const data: PostResponse = res.data;
        let list = Array.isArray(data.details) ? data.details : [];
        if (isLoggedIn && user) list = list.filter(p => p.user_id === user.id);
        setPosts(list);

        const total =
          isLoggedIn && user
            ? list.length
            : (data.pagination?.total ?? list.length);
        const totalPages = Math.max(1, Math.ceil(total / registersPerPage));
        setPagination({
          total,
          totalPages,
          registersPerPage,
          currentPage: page,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          nextPage: Math.min(page + 1, totalPages),
          previousPage: Math.max(1, page - 1),
          firstPage: 1,
          lastPage: totalPages,
        });
        setCurrentPage(page);
      } else if (isLoggedIn && user) {
        const resUser = await getPostByUserPaged(
          user.id,
          page,
          registersPerPage,
          orderBy
        );
        const dataUser: PostResponse = resUser.data;
        const userPosts = Array.isArray(dataUser.details)
          ? dataUser.details
          : [];
        setPosts(userPosts);
        if (dataUser.pagination) {
          setPagination({
            total: dataUser.pagination.total,
            totalPages: dataUser.pagination.totalPages,
            registersPerPage: dataUser.pagination.registersPerPage,
            currentPage: dataUser.pagination.currentPage,
            hasNextPage: dataUser.pagination.hasNextPage,
            hasPreviousPage: dataUser.pagination.hasPreviousPage,
            nextPage:
              dataUser.pagination.nextPage ||
              Math.min(page + 1, dataUser.pagination.totalPages),
            previousPage:
              dataUser.pagination.previousPage || Math.max(1, page - 1),
            firstPage: dataUser.pagination.firstPage || 1,
            lastPage:
              dataUser.pagination.lastPage || dataUser.pagination.totalPages,
          });
        }
        setCurrentPage(page);
      } else {
        const res = await getPaged(page, registersPerPage, orderBy);
        const data: PostResponse = res.data;
        const list = Array.isArray(data.details) ? data.details : [];
        setPosts(list);
        if (data.pagination) {
          setPagination({
            total: data.pagination.total,
            totalPages: data.pagination.totalPages,
            registersPerPage: data.pagination.registersPerPage,
            currentPage: data.pagination.currentPage,
            hasNextPage: data.pagination.hasNextPage,
            hasPreviousPage: data.pagination.hasPreviousPage,
            nextPage:
              data.pagination.nextPage ||
              Math.min(page + 1, data.pagination.totalPages),
            previousPage: data.pagination.previousPage || Math.max(1, page - 1),
            firstPage: data.pagination.firstPage || 1,
            lastPage: data.pagination.lastPage || data.pagination.totalPages,
          });
        } else {
          const total = list.length;
          const totalPages = Math.max(1, Math.ceil(total / registersPerPage));
          setPagination({
            total,
            totalPages,
            registersPerPage,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: Math.min(page + 1, totalPages),
            previousPage: Math.max(1, page - 1),
            firstPage: 1,
            lastPage: totalPages,
          });
        }
        setCurrentPage(page);
      }
    } catch (err) {
      showToast({ type: 'error', message: getErrorMessage(err) });
      setPosts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  // Paginação usada no footer
  const effectivePagination: Pagination | null = pagination;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPosts(page, search);
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      showToast({ type: 'success', message: 'Post removido com sucesso!' });
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      showToast({ type: 'error', message: getErrorMessage(err) });
    }
  };

  return (
    <div className="p-12">
      <h1 className="font-bold text-5xl text-black">
        {user ? 'Meus Posts' : 'Todos os Posts'}
      </h1>

      <PostsHeader
        search={search}
        setSearch={setSearch}
        onSearch={(term?: string) => fetchPosts(1, term ?? search)}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isLandscape={isLandscape}
        setIsLandscape={setIsLandscape}
        onFilterSelect={category => setSelectedCategory(category)}
        isLoggedIn={isLoggedIn}
        onCreatePost={() => navigate(Routes.DASHBOARD_CREATE_POST)}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : posts.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center text-gray-600">
            <p className="text-xl font-semibold">Nenhum post encontrado</p>
            <p className="text-sm mt-2">
              Tente ajustar os filtros ou criar um novo post.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Informação de quantidade */}
          {filteredPosts.length > 0 && effectivePagination && (
            <p className="flex justify-center text-gray-600 mt-4 text-lg">
              Mostrando {posts.length} de {effectivePagination.total} posts
            </p>
          )}
          <PostsGrid
            posts={posts}
            isLandscape={isLandscape}
            onDelete={handleDelete}
          />
          {(() => {
            const pag = effectivePagination;
            if (!pag) return null;
            return (
              <PostsPagination
                pagination={pag}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            );
          })()}
        </>
      )}
    </div>
  );
};

export default Posts;
