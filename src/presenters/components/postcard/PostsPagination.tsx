import type { Pagination } from '../ui/posts';

interface PostsPaginationProps {
  pagination: Pagination;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PostsPagination: React.FC<PostsPaginationProps> = ({
  pagination,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-3 mt-8">
      <button
        disabled={!pagination.hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
      >
        ← Anterior
      </button>

      <div className="flex gap-2">
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[44px] px-4 py-2.5 text-base font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
              p === currentPage
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        disabled={!pagination.hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Próximo →
      </button>
    </div>
  );
};
