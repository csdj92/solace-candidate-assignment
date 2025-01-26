import { Pagination } from "../lib/types";

interface PaginationControlsProps {
  pagination: Pagination;
  filteredCount: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ 
  pagination, 
  filteredCount,
  onPageChange
}: PaginationControlsProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-t border-slate-200">
      <div className="text-sm text-slate-600">
        Showing {filteredCount} of {pagination.totalItems} results
      </div>
      <div className="flex gap-2">
        <button
          disabled={pagination.currentPage === 1}
          className="px-3 py-1 rounded-md bg-slate-100 disabled:opacity-50"
          onClick={() => onPageChange(pagination.currentPage - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-1 text-slate-600">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-3 py-1 rounded-md bg-slate-100 disabled:opacity-50"
          onClick={() => onPageChange(pagination.currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
} 