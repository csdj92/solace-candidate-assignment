import { LoadingSpinner } from "./LoadingSpinner";

interface SearchHeaderProps {
  searchValue: string;
  onSearch: (value: string) => void;
  isLoading?: boolean;
}

export function SearchHeader({ searchValue, onSearch, isLoading }: SearchHeaderProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search advocates by name, location, or specialty..."
        className="w-full pl-10 pr-4 py-3 text-lg rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search advocates"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {isLoading ? (
          <LoadingSpinner className="h-5 w-5 text-gray-400" />
        ) : (
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
    </div>
  );
} 