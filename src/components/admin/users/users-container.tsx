"use client";

import { useRef } from "react";
import { hasActiveFilters } from "@/lib/utils/has-active-filters";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";
import { TextShimmer } from "@/components/ui/text-shimmer";
import EmptyNotesState from "@/components/notes/empty-notes";
import { useGetUsersQuery } from "@/store/api/adminApi";
import UsersList from "./users-list";
import { useGetUserQuery } from "@/store/api/userApi";
import { PaginationDemo } from "./pagination";

export default function UsersListContainer({
  filters,
  handlePage,
}: {
  filters: any;
  handlePage: (page: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading } = useGetUsersQuery(filters);
  const { data: user } = useGetUserQuery({});
  //   useInfiniteScroll({
  //     ref: scrollRef,
  //     hasMore: data?.meta?.hasMore,
  //     isFetching,
  //     handlePage,
  //   });

  const isFiltered = hasActiveFilters(filters, DEFAULT_NOTE_QUERY);

  return (
    <div className="flex-1 overflow-hidden pt-4">
      <div ref={scrollRef} className="h-full overflow-hidden">
        {isLoading && filters.page === 1 ? (
          <div className="h-full flex items-center justify-center">
            <TextShimmer>Fetching Users...</TextShimmer>
          </div>
        ) : data?.data.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p>No Users found</p>
          </div>
        ) : (
          <div className="flex h-full flex-col overflow-hidden">
            <UsersList users={data ?? []} selfId={user?.user?.id} />
            {data?.meta?.totalPages > 1 && (
              <PaginationDemo
                totalPages={data?.meta?.totalPages ?? 0}
                activePage={filters.page}
                handlePage={handlePage}
              />
            )}
          </div>
        )}
        {isFetching && filters.page !== 1 && (
          <div className="w-full text-center">Loading...</div>
        )}
      </div>
    </div>
  );
}
