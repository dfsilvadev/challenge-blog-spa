import { Funnel, ListBullets, SquaresFour } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { getColorFromCategory } from '../../../utils/colorCategory';
import { subjects } from '../ui/subjects';

interface PostsHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch: (term?: string) => void;
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
    const term = search?.trim?.() ?? '';
    if (!term) return;
    const handler = setTimeout(() => onSearch(term), 1000);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
            onChange={e => {
              const val = e.target.value;
              setSearch(val);
              if (val.trim() === '') {
                onSearch('');
              }
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (search.trim()) onSearch(search.trim());
              }
            }}
            className="p-2 pl-10 rounded-[10px] w-full h-[40px] bg-white border border-[#DFDFDF] focus:outline-none focus:border-blue-500 placeholder-gray-400 text-black"
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
              absolute mt-2 w-72 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 z-100
              right-0
              md:right-auto md:left-auto md:translate-x-0
              sm:left-1/2 sm:-translate-x-1/2
            `}
            >
              <p className="text-gray-900 text-lg font-bold text-center mb-3">
                Filtrar por Categoria
              </p>
              <ul className="flex flex-col gap-2">
                {subjects.map(subject => (
                  <li key={subject.name}>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(subject.name)}
                      className={`cursor-pointer capitalize w-full px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-200 ${getColorFromCategory(subject.name)} ${
                        selectedCategory === subject.name
                          ? 'ring-2 ring-offset-2 ring-blue-500 scale-105'
                          : 'hover:scale-102'
                      } shadow-sm hover:shadow-md`}
                    >
                      {selectedCategory === subject.name && '✓ '}
                      {t(`subjects.${subject.name}`, subject.name)}
                    </button>
                  </li>
                ))}
                {selectedCategory && (
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(selectedCategory)}
                    className="cursor-pointer w-full px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all mt-1"
                  >
                    Limpar Filtro
                  </button>
                )}
              </ul>

              <hr className="my-4 border-gray-200" />
              <p className="text-gray-900 text-lg font-bold text-center mb-3">
                Ordenar Por
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOrderBy('DESC')}
                  className={`cursor-pointer flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    orderBy === 'DESC'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🕒 Recentes
                </button>
                <button
                  type="button"
                  onClick={() => setOrderBy('ASC')}
                  className={`cursor-pointer flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    orderBy === 'ASC'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📅 Antigos
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
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={onCreatePost}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
            </svg>
            Criar Post
          </button>
        )}
        {/* Botões de Visualização */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
          <button
            onClick={() => setIsLandscape(false)}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              !isLandscape
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            title="Visualização em Grade"
          >
            <SquaresFour size={24} weight={!isLandscape ? 'fill' : 'regular'} />
          </button>
          <button
            onClick={() => setIsLandscape(true)}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              isLandscape
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            title="Visualização em Lista"
          >
            <ListBullets size={24} weight={isLandscape ? 'fill' : 'regular'} />
          </button>
        </div>
      </div>
    </div>
  );
};
