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
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={!pagination.hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
        className="cursor-pointer px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`cursor-pointer px-3 py-1 border rounded ${
            p === currentPage ? 'bg-red-800 text-white' : 'bg-white'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={!pagination.hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="cursor-pointer px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
