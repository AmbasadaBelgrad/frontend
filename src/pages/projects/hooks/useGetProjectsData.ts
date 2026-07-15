import { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { useUrlFilters } from "./useUrlFilters";
import { useProjectsQuery } from "@entities/project/model/useProjectsQuery";
import { useCategoriesQuery } from "@entities/project/model/useCategoriesQuery";
import { useTagsQuery } from "@entities/project/model/useTagsQuery";
import { useViewportWidth } from "@shared/lib/useWidthViewPort";
import { usePagination } from "./usePagination";

export const useGetProjectsData = () => {
  const {
    search: urlSearch,
    type: urlType,
    tags: urlTags,
    updateFilters: urlUpdateFilters,
  } = useUrlFilters();
  const { isMobile, isTablet } = useViewportWidth();
  const isFirstRender = useRef(true);
  const prevFiltersRef = useRef({
    search: urlSearch,
    type: urlType,
    tags: urlTags,
  });
  const [isRestoring, setIsRestoring] = useState(false);
  const limit = useMemo(() => {
    return isMobile || isTablet ? 6 : 12;
  }, [isMobile, isTablet]);
  const pagination = usePagination({
    totalItems: 0,
    initialPage: 1,
    initialLimit: limit,
  });
  const queryParams = useMemo(
    () => ({
      limit: pagination.limit,
      offset: pagination.offset,
      search: urlSearch,
      type: urlType,
      tag: urlTags,
    }),
    [pagination.limit, pagination.offset, urlSearch, urlType, urlTags],
  );
  const queryResult = useProjectsQuery(queryParams);
  const categoriesQuery = useCategoriesQuery();
  const tagsQuery = useTagsQuery();

  useEffect(() => {
    const totalItems = queryResult.data?.pagination?.totalItems;
    if (totalItems !== undefined) {
      pagination.setTotalItems(totalItems);
    }
  }, [queryResult.data, pagination]);

  useEffect(() => {
    pagination.setLimit(limit);
  }, [limit, pagination]);

  const handleUpdateFilters = useCallback(
    (filters: { search?: string; type?: string; tags?: string[] }) => {
      const nextSearch = filters.search ?? urlSearch;
      const nextType = filters.type ?? urlType;
      const nextTags = filters.tags ?? urlTags;

      const tagsChanged =
        nextTags.length !== urlTags.length ||
        nextTags.some((tag, index) => tag !== urlTags[index]);

      const hasChanges =
        nextSearch !== urlSearch || nextType !== urlType || tagsChanged;

      if (hasChanges) {
        pagination.resetPage();
        urlUpdateFilters(filters);
      }
    },
    [urlUpdateFilters, urlSearch, urlType, urlTags, pagination],
  );

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const filtersChanged =
      urlSearch !== prevFilters.search ||
      urlType !== prevFilters.type ||
      urlTags.length !== prevFilters.tags.length ||
      urlTags.some((tag, index) => tag !== prevFilters.tags[index]);

    if (filtersChanged && !isFirstRender.current && !isRestoring) {
      pagination.resetPage();
    }

    prevFiltersRef.current = {
      search: urlSearch,
      type: urlType,
      tags: urlTags,
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [urlSearch, urlType, urlTags, pagination, isRestoring]);

  const setRestoring = useCallback((value: boolean) => {
    setIsRestoring(value);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRestoring(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = !queryResult.data && queryResult.isLoading;

  return useMemo(
    () => ({
      projects: queryResult.data?.items || [],
      categories: categoriesQuery.data || [],
      availableTags: tagsQuery.data || [],
      loading: isLoading,
      isFetching: queryResult.isFetching && !isRestoring,
      error: queryResult.error || categoriesQuery.error || tagsQuery.error,
      filters: {
        search: urlSearch,
        type: urlType,
        tags: urlTags,
      },

      updateFilters: handleUpdateFilters,
      setRestoring,

      pagination: {
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        totalItems: pagination.totalItems,
        visiblePages: pagination.visiblePages,
        goToPage: pagination.goToPage,
        goToNext: pagination.goToNext,
        goToPrev: pagination.goToPrev,
        hasNext: pagination.hasNext,
        hasPrev: pagination.hasPrev,
        limit: pagination.limit,
        resetPage: pagination.resetPage,
      },
    }),
    [
      queryResult.data,
      queryResult.isFetching,
      queryResult.error,
      categoriesQuery.data,
      categoriesQuery.error,
      tagsQuery.data,
      tagsQuery.error,
      urlSearch,
      urlType,
      urlTags,
      handleUpdateFilters,
      pagination,
      isLoading,
      isRestoring,
      setRestoring,
    ],
  );
};
