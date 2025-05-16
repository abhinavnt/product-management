import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-500">
        Showing {start}-{end} of {totalCount} items
      </div>

      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={cn(
              'h-8 w-8 flex items-center justify-center rounded-full',
              page === currentPage ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Show</span>
        <select
          className="border rounded p-1 text-sm"
          value={perPage}
          onChange={(e) => onPerPageChange(parseInt(e.target.value))}
        >
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
          <option value={50}>50 rows</option>
        </select>
      </div>
    </div>
  );
}