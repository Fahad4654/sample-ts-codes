interface PaginationResult<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

function paginate<T>(
  items: T[],
  page: number,
  pageSize: number
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalItems,
    currentPage,
    totalPages,
    pageSize,
  };
}

export { paginate, PaginationResult };