import React from "react";
import { NotesResponse } from "../../types";
import NotesLoading from "../notes-loading/notes-loading";
import NotesEmpty from "../notes-empty/notes-empty";
import { NoteList } from "./notes-list";
import { DEFAULT_NOTE_QUERY } from "../../constants";

type Props = {
  isLoading: boolean;
  data: NotesResponse | undefined;
  isFetching: boolean;
  isFirstPage: boolean;
  isFiltered: boolean;
  filters: typeof DEFAULT_NOTE_QUERY;
  ref: React.RefObject<HTMLDivElement | null>;
};

const NotesListView = ({
  isLoading,
  isFetching,
  data,
  isFirstPage,
  filters,
  isFiltered,
  ref,
}: Props) => {
  return (
    <div className="flex-1 overflow-hidden p-4">
      <div ref={ref} className="h-full overflow-y-auto">
        {isLoading && isFirstPage ? (
          <NotesLoading />
        ) : data?.data.length === 0 ? (
          <NotesEmpty isFiltered={isFiltered} />
        ) : (
          <NoteList filters={filters} notes={data?.data ?? []} />
        )}
        {isFetching && !isFirstPage && (
          <div className="w-full text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default NotesListView;
