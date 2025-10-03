import { useCallback, useEffect, useState } from "react";
import { IPaginatedResponse } from "../types";

interface UsePaginatedLoaderOptions<T> {
  fetchPage: (page: number) => Promise<IPaginatedResponse<T>>;
  initialPage?: number;
  initialData?: IPaginatedResponse<T>;
}

export interface IPaginatedLoaderResult<T> {
  items: T[];
  loadMore: () => void;
  loading: boolean;
  hasNext: boolean;
  error: string | null;
}

export function usePaginatedLoader<T>(options: UsePaginatedLoaderOptions<T>): IPaginatedLoaderResult<T> {
  const { fetchPage, initialPage = 1, initialData } = options;
  const [items, setItems] = useState<T[]>(initialData?.items || []);
  const [currentPage, setCurrentPage] = useState(
    initialData?.metadata.currentPage || initialPage - 1
  );
  const [hasNext, setHasNext] = useState(
    initialData ? initialData.metadata.hasNextPage : true
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setItems(initialData.items);
      setCurrentPage(initialData.metadata.currentPage);
      setHasNext(initialData.metadata.hasNextPage);
    }
  }, [initialData]);

  const loadMore = useCallback(async () => {
    if (!hasNext || loading) return;

    setLoading(true);
    setError(null);
    const nextPage = currentPage + 1;

    try {
      const response = await fetchPage(nextPage);
      setItems(prev => [...prev, ...response.items]);
      setCurrentPage(nextPage);
      setHasNext(response.metadata.hasNextPage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred while loading data';
      setError(errorMessage);
      console.error('Error loading more items:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, fetchPage, hasNext, loading]);

  return { items, loadMore, loading, hasNext, error };
}