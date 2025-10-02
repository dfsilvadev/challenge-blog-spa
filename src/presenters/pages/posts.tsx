import { useState, useEffect } from 'react';
import { Funnel, SquaresFour, ListBullets } from 'phosphor-react';

import { getall } from '../../resources/postResources';

import type { Detail } from '../components/ui/posts';
import PostCard from '../components/postCard';

const Posts = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [posts, setPosts] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getall();
        const details = res.data.details;

        if (typeof details !== 'string') {
          setPosts(details);
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
  }, []);

  return (
    <div>
      <div className="p-12">
        <h1 className="font-bold text-5xl text-black">All Posts</h1>

        {/* Filters */}
        <div className="mt-4 md:mt-10 flex flex-wrap justify-between items-center gap-4">
          {/* Left */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="🔎 Digite aqui..."
              className="p-3 rounded-[10px] text-3xl flex-1
                w-[300px] lg:w-[400px] h-[40px] lg:h-[50px]
                bg-gray-200 
                border border-black focus:outline-none focus:border-red-500
                placeholder-gray-400 text-black"
            />
            <Funnel size={40} className="text-black md:ml-0 xl:ml-10" />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 sm:justify-center md:justify-end">
            <button
              className="bg-black text-white
                h-[40px] lg:h-[50px]
                w-[150px] md:w-[200px] lg:w-[300px]
                rounded-[10px]
                sm:p-4 lg:p-2
                hover:bg-gray-500"
            >
              <span className="text-2xl md:text-3xl lg:text-5xl 2xl:text-4xl">
                Criar novo post
              </span>
            </button>
            <SquaresFour
              onClick={() => setIsLandscape(false)}
              size={40}
              className={`ml-45 md:ml-0 ${isLandscape ? 'text-black' : 'text-red-600'}`}
            />
            <ListBullets
              onClick={() => setIsLandscape(true)}
              size={40}
              className={`${isLandscape ? 'text-red-600' : 'text-black'}`}
            />
          </div>
        </div>

        {loading && <p>Carregando...</p>}
        {!loading && posts.length === 0 && <p>Nenhum post encontrado.</p>}

        {/* Cards All Posts */}
        <div
          className={`mt-12 gap-4 ${
            isLandscape
              ? 'grid gap-10'
              : 'grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] lg:grid-cols-[repeat(auto-fill,minmax(200px,auto))] 2xl:grid-cols-[repeat(auto-fill,minmax(300px,auto))]'
          }`}
        >
          {posts.map(post => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.content}
              author={post.user_name}
              createDate={post.created_at}
              isLandscape={isLandscape}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
