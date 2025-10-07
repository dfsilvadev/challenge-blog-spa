import { useEffect, useMemo, useState } from 'react';

export type PaginationInfo = {
  total: number;
  totalPages: number;
  registersPerPage: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage: number;
  firstPage: number;
  lastPage: number;
};

export function usePagination<T>(items: T[], perPage: number, initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
  }, [items, perPage, currentPage]);

  const pagination: PaginationInfo = {
    total,
    totalPages,
    registersPerPage: perPage,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    nextPage: Math.min(totalPages, currentPage + 1),
    previousPage: Math.max(1, currentPage - 1),
    firstPage: 1,
    lastPage: totalPages,
  };

  const goto = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
  };

  useEffect(() => {
    setCurrentPage(prev => {
      const tp = Math.max(1, Math.ceil(items.length / perPage));
      if (prev > tp) return tp;
      if (prev < 1) return 1;
      return prev;
    });
  }, [items.length, perPage]);

  return { pageItems, pagination, currentPage, goto } as const;
}
