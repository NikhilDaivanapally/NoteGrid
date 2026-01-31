import { PaginationDemo } from "@/features/shared/components/pagination";
import React from "react";
import UsersList from "./users-list";
import UsersLoading from "../users-loading/users-loading";
import UsersEmpty from "../users-empty/users-empty";

type Props = {
  isLoading: boolean;
  isFirstPage: boolean;
  isFiltered: boolean;
  data: any;
  filters: any;
  currentUser: any;
  handlePage: (page: number) => void;
  ref: React.RefObject<HTMLDivElement | null>;
};

const UsersListView = ({
  isLoading,
  isFirstPage,
  isFiltered,
  filters,
  data,
  handlePage,
  currentUser,
  ref,
}: Props) => {
  return (
    <div className="flex-1 overflow-hidden pt-4">
      <div ref={ref} className="h-full overflow-hidden">
        {isLoading && isFirstPage ? (
          <UsersLoading />
        ) : data?.data.length === 0 ? (
          <UsersEmpty isFiltered={isFiltered} />
        ) : (
          <div className="flex h-full flex-col overflow-hidden">
            <UsersList users={data ?? []} selfId={currentUser?.user?.id} />
            {data?.meta?.totalPages > 1 && (
              <PaginationDemo
                totalPages={data?.meta?.totalPages ?? 0}
                activePage={filters.page}
                handlePage={handlePage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersListView;
