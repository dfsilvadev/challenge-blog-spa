import { useState, useEffect, useRef } from 'react';
import { Funnel, SquaresFour, ListBullets } from 'phosphor-react';

import { getall, remove } from '../../resources/postResources';
import type { Detail } from '../components/ui/posts';
import PostCard from '../components/postcard';

import { useToast } from '../../hooks/useToast';
import { getErrorMessage } from '../../axios/api';
import { useAuth } from '../../hooks/useAuth';

import { useNavigate } from 'react-router';
import { Routes } from '../router/constants/routesMap';
import { getColorFromCategory } from '../../utils/colorCategory';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Subject {
  name: string;
}

const subjects: Subject[] = [
  { name: 'Portuguese' },
  { name: 'Mathematics' },
  { name: 'History' },
  { name: 'Geography' },
  { name: 'Science' },
  { name: 'Art' },
  { name: 'Physical Education' },
];

const Posts = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [posts, setPosts] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const { showToast } = useToast();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => setFilterOpen(false));

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getall();
        const details = res.data.details;

        if (Array.isArray(details)) {
          const filtered = user
            ? details.filter((post: Detail) => post.user_id === user.id)
            : details;

          setPosts(filtered);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const removePost = async (id: string) => {
    try {
      await remove(id);
      showToast({ type: 'success', message: 'Post removido com sucesso!' });
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      showToast({ type: 'error', message: getErrorMessage(err) });
    }
  };

  return (
    <div>
      <div className="p-12">
        <h1 className="font-bold text-5xl text-black">
          {user ? 'Meus Posts' : 'Todos os Posts'}
        </h1>

        {/* Filters */}
        <div className="mt-4 md:mt-10 flex flex-wrap justify-between items-center gap-4">
          {/* Left */}
          <div className="flex items-center gap-4 w-full sm:w-auto relative">
            {/* Input com ícone de lupa */}
            <div className="relative w-full lg:w-[400px]">
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Digite aqui..."
                className="p-3 pl-10 rounded-[10px] text-3xl flex-1
                  w-[300px] lg:w-full h-[40px] lg:h-[50px]
                  bg-white border border-[#DFDFDF] focus:outline-none focus:border-red-500
                  placeholder-gray-400 text-black"
              />
            </div>

            {/* Ícone de funil com dialog */}
            <div className="relative" ref={filterRef}>
              {/* Botão Funnel */}
              <button
                type="button"
                onClick={() => setFilterOpen(!filterOpen)}
                className="p-2"
                aria-label="Filtrar matérias"
              >
                <Funnel size={24} className="text-black" />
              </button>

              {/* Dropdown */}
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md p-3 z-100">
                  <ol className=" text-center text-black">
                    Categorias
                    <ul className="flex flex-col gap-2 mt-2">
                      {subjects.map(subject => (
                        <li key={subject.name}>
                          <button
                            type="button"
                            onClick={() => {
                              console.log('Filtrar por:', subject.name);
                              setFilterOpen(false);
                            }}
                            className={`w-full px-3 py-2 rounded-full text-white ${getColorFromCategory(
                              subject.name
                            )} hover:opacity-90`}
                          >
                            {subject.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 sm:justify-center md:justify-end">
            {isLoggedIn && (
              <button
                className="bg-black text-white
                h-[40px]
                w-[100px] md:w-[150px] lg:w-[100px] xl:w-[150px]
                rounded-[10px]
                sm:p-4 lg:p-2
                hover:bg-gray-500"
                onClick={() => navigate(Routes.DASHBOARD)}
              >
                <span className="text-xl md:text-xl lg:text-3xl 2xl:text-2xl">
                  Criar novo post
                </span>
              </button>
            )}
            <SquaresFour
              onClick={() => setIsLandscape(false)}
              size={40}
              className={`ml-60 md:ml-0 ${isLandscape ? 'text-black' : 'text-red-800'}`}
            />
            <ListBullets
              onClick={() => setIsLandscape(true)}
              size={40}
              className={`${isLandscape ? 'text-red-800' : 'text-black'}`}
            />
          </div>
        </div>

        {loading && <p>Carregando...</p>}
        {!loading && posts.length === 0 && <p>Nenhum post encontrado.</p>}

        {/* Cards */}
        <div
          className={`mt-12 gap-10 xl:gap-2  ${
            isLandscape
              ? 'grid'
              : 'grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] lg:grid-cols-[repeat(auto-fill,minmax(200px,auto))] 2xl:grid-cols-[repeat(auto-fill,minmax(400px,auto))]'
          }`}
        >
          {posts.map(post => (
            <PostCard
              key={post.id}
              postId={post.id}
              title={post.title}
              description={post.content}
              author={post.user_name}
              createDate={post.created_at}
              category={getColorFromCategory(post.category_name)}
              isLandscape={isLandscape}
              onDelete={() => removePost(post.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
