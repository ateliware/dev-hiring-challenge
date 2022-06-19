import React from "react";

export interface Paginator {
  totalCount: number;
  numPages: number;
  page: number;
}

export interface PaginatorHook {
  updatePage: (pageTo: number) => void;
  paginator: Paginator;
  updatePaginator: (paginator: Partial<Paginator>) => void;
}

export const usePaginator = (): PaginatorHook => {
  const [ paginator, setPaginator ] = React.useState<Paginator>({
    page: 1,
    numPages: 0,
    totalCount: 0
  });

  const updatePage = (page: number): void => {
    setPaginator({
      ...paginator,
      page,
    });
  }

  const updatePaginator = (nextPaginator: Partial<Paginator>): void => {
    setPaginator({
      page: nextPaginator.page || paginator.page,
      totalCount: nextPaginator.totalCount || paginator.totalCount,
      numPages: calcNumPages(nextPaginator.totalCount || paginator.numPages),
    });
  }

  return { paginator, updatePaginator, updatePage };
}

const calcNumPages = (totalItems: number): number => (
  Math.ceil(totalItems / 5)
)
