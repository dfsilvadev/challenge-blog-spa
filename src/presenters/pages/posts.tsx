import { useState, useEffect } from 'react';
import { getall, getPostFilter, remove } from '../../resources/postResources';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { Routes } from '../router/constants/routesMap';
import type { Detail, Pagination, PostResponse } from '../components/ui/posts';
import { PostsHeader } from '../components/postcard/PostsHeader';
import { PostsGrid } from '../components/postcard/PostsGrid';
import { PostsPagination } from '../components/postcard/PostsPagination';
import { getErrorMessage } from '../../axios/api';
import { useFilteredPosts } from '../../hooks/useFilteredPosts';

const Posts = () => {
  const [posts, setPosts] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('ASC');
  const [isLandscape, setIsLandscape] = useState(false);
  const [totalRecords, setTotalRecords] = useState<number | null>(null);

  const { user, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { filteredPosts, search, setSearch, setSelectedCategory } =
    useFilteredPosts(posts);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await getall();
        setTotalRecords(res.data.pagination?.total || 0);
      } catch (err) {
        console.error('Erro ao buscar total de posts:', err);
        setTotalRecords(0);
      }
    };
    fetchTotal();
  }, []);

  const fetchPosts = async (page: number = 1, searchTerm: string = search) => {
    setLoading(true);
    try {
      const res = await getPostFilter(searchTerm, orderBy, page, 10);
      const data: PostResponse = res.data;

      let visiblePosts: Detail[] = [];

      if (isLoggedIn && user) {
        visiblePosts = Array.isArray(data.details)
          ? data.details.filter(post => post.user_id === user.id)
          : [];
      } else {
        visiblePosts = Array.isArray(data.details) ? data.details : [];
      }

      setPosts(visiblePosts);

      const total =
        isLoggedIn && user
          ? visiblePosts.length
          : totalRecords || visiblePosts.length;
      const registersPerPage = 10;
      const totalPages = Math.ceil(total / registersPerPage) || 1;

      setPagination({
        total,
        totalPages,
        registersPerPage,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        nextPage: page < totalPages ? page + 1 : totalPages,
        previousPage: page > 1 ? page - 1 : 1,
        firstPage: 1,
        lastPage: totalPages,
      });

      setCurrentPage(page);
    } catch (err) {
      showToast({ type: 'error', message: getErrorMessage(err) });
      setPosts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (totalRecords !== null) fetchPosts(1);
  }, [totalRecords, orderBy, user, isLoggedIn]);

  const handlePageChange = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages)
      fetchPosts(page);
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
        onSearch={() => {}}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isLandscape={isLandscape}
        setIsLandscape={setIsLandscape}
        onFilterSelect={category => setSelectedCategory(category)}
        isLoggedIn={isLoggedIn}
        onCreatePost={() => navigate(Routes.DASHBOARD)}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {/* Informação de quantidade */}
          {filteredPosts.length > 0 && (
            <p className="flex justify-center text-gray-600 mt-4 text-lg">
              Mostrando {filteredPosts.length} de{' '}
              {pagination?.total || filteredPosts.length} posts
            </p>
          )}
          <PostsGrid
            posts={filteredPosts}
            isLandscape={isLandscape}
            onDelete={handleDelete}
          />
          {pagination && (
            <PostsPagination
              pagination={pagination}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Posts;
