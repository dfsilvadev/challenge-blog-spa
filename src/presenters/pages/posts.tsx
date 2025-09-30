import { useState } from 'react';
import { Funnel, SquaresFour, ListBullets } from 'phosphor-react';

const Posts = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  return (
    <div>
      <div className="p-12">
        <h1 className="font-bold text-5xl text-black">All Posts</h1>

        {/* Filters */}
        <div className=" mt-4 md:mt-10 flex flex-wrap justify-between items-center  gap-4 ">
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
            <Funnel size={40} className="text-black md:ml-0 xl:ml-10 " />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 sm:justify-center md:justify-end">
            <button
              className="bg-black text-white
              h-[40px] lg:h-[50px]
              w-[150px] md:w-[200px] lg:w-[300px]
              rounded-[10px]
              sm:p-4 lg:p-2
            hover:bg-gray-500 "
            >
              <span className="text-2xl md:text-3xl lg:text-5xl 2xl:text-4xl">
                Criar novo post
              </span>
            </button>
            <SquaresFour
              onClick={() => setIsLandscape(false)}
              size={40}
              className={` ml-45 md:ml-0 ${isLandscape ? 'text-black' : 'text-red-600'}`}
            />
            <ListBullets
              onClick={() => setIsLandscape(true)}
              size={40}
              className={`${isLandscape ? 'text-red-600' : 'text-black'}`}
            />
          </div>
        </div>

        {/* Cards All Posts */}
        <div
          className={`mt-12 md:mt-16 grid justify-items-center ${
            isLandscape
              ? 'gap-5 justify-items-centergrid-cols-1'
              : 'gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-7 2xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Posts;
