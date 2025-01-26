"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { 
  SearchHeader,
  LoadingSpinner,
  ErrorMessage,
  AdvocatesTable,
  PaginationControls
} from "../components";
import { Advocate, Pagination } from "../lib/types";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchData = async (page = 1, search = "") => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/advocates?page=${page}&search=${encodeURIComponent(search)}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const { data = [], meta } = await response.json();
      
      setAdvocates(data);
      setFilteredAdvocates(data);
      setPagination({
        currentPage: meta?.currentPage || 1,
        totalPages: meta?.totalPages || 1,
        totalItems: meta?.totalItems || 0,
      });
    } catch (error) {
      setError("Failed to load advocates. Please try again later.");
      setFilteredAdvocates([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchData(1, debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handlePageChange = (page: number) => {
    fetchData(page, searchTerm);
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Solace Advocates</h1>
      
      <SearchHeader
        searchValue={searchTerm}
        onSearch={(value: string) => setSearchTerm(value)}
        isLoading={isLoading}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <AdvocatesTable advocates={filteredAdvocates} isLoading={isLoading} />
      )}

      <PaginationControls
        pagination={pagination}
        filteredCount={filteredAdvocates?.length || 0}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
