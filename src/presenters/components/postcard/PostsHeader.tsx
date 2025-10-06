import { useRef, useState, useEffect } from 'react';
import { Funnel, SquaresFour, ListBullets } from 'phosphor-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { getColorFromCategory } from '../../../utils/colorCategory';
import { subjects } from '../ui/subjects';
import { useTranslation } from 'react-i18next';

interface PostsHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
  orderBy: 'ASC' | 'DESC';
  setOrderBy: (value: 'ASC' | 'DESC') => void;
  isLandscape: boolean;
  setIsLandscape: (value: boolean) => void;
  onFilterSelect: (subject: string | null) => void;
  isLoggedIn: boolean;
  onCreatePost: () => void;
}

export const PostsHeader = ({
  search,
  setSearch,
  onSearch,
  orderBy,
  setOrderBy,
  isLandscape,
  setIsLandscape,
  onFilterSelect,
  isLoggedIn,
  onCreatePost,
}: PostsHeaderProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useClickOutside(filterRef, () => setFilterOpen(false));

  useEffect(() => {
    const handler = setTimeout(() => onSearch(), 1000);
    return () => clearTimeout(handler);
  }, [search, onSearch]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      onFilterSelect(null);
    } else {
      setSelectedCategory(category);
      onFilterSelect(category);
    }
    setFilterOpen(false);
  };
  return (
    <div className="mt-4 md:mt-10 flex flex-wrap justify-between items-center gap-4">
      {/* Lado esquerdo: input + filtro */}
      <div className="flex items-center gap-4">
        <div className="relative w-[300px] lg:w-[400px] ">
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
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
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-2 pl-10 rounded-[10px] w-full h-[40px] bg-white border border-[#DFDFDF] focus:outline-none focus:border-red-500 placeholder-gray-400 text-black"
          />
        </div>

        {/* Filtro */}
        <div className="relative" ref={filterRef}>
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            className="p-2"
            aria-label="Filtrar matérias"
          >
            <Funnel size={24} className="text-black cursor-pointer" />
          </button>

          {filterOpen && (
            <div
              className={`
              absolute mt-2 w-60 bg-white border border-[#DFDFDF] shadow-lg rounded-[10px] p-3 z-100
              right-0
              md:right-auto md:left-auto md:translate-x-0
              sm:left-1/2 sm:-translate-x-1/2
            `}
            >
              <p className="text-black text-xl text-center">Categorias</p>
              <ul className="flex flex-col gap-2 mt-2">
                {subjects.map(subject => (
                  <li key={subject.name}>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(subject.name)}
                      className={`cursor-pointer capitalize w-full px-3 py-2 rounded-[10px] text-white ${getColorFromCategory(subject.name)} ${
                        selectedCategory === subject.name
                          ? 'ring-2 ring-red-600'
                          : ''
                      } hover:opacity-90`}
                    >
                      {t(`subjects.${subject.name}`, subject.name)}
                    </button>
                  </li>
                ))}
              </ul>

              <hr className="my-3" />
              <p className="text-black text-xl text-center">Ordenar</p>
              <div className="flex justify-around mt-2">
                <button
                  type="button"
                  onClick={() => setOrderBy('DESC')}
                  className={`cursor-pointer px-3 py-1 rounded-md border border-[#DFDFDF] ${
                    orderBy === 'DESC'
                      ? 'bg-red-600 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  Recentes
                </button>
                <button
                  type="button"
                  onClick={() => setOrderBy('ASC')}
                  className={`cursor-pointer px-3 py-1 rounded-md border ${
                    orderBy === 'ASC'
                      ? 'bg-red-600 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  Antigos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lado direito: botão criar + modos de exibição */}
      <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 justify-center sm:justify-end">
        {isLoggedIn && (
          <button
            className="cursor-pointer bg-black text-white h-[40px] w-[150px] rounded-[10px] hover:bg-gray-500"
            onClick={onCreatePost}
          >
            <span className="text-xl">Criar post</span>
          </button>
        )}
        <SquaresFour
          onClick={() => setIsLandscape(false)}
          size={40}
          className={`cursor-pointer ${isLandscape ? 'text-black' : 'text-red-800'}`}
        />
        <ListBullets
          onClick={() => setIsLandscape(true)}
          size={40}
          className={`cursor-pointer ${isLandscape ? 'text-red-800' : 'text-black'}`}
        />
      </div>
    </div>
  );
};
