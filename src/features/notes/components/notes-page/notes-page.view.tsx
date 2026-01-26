import NewNote from "@/features/shared/ui/new-note";
import NotesFilter from "../notes-filters/notes-filters";
import NotesListContainer from "../notes-list/notes-list.container";

const NotesPageView = ({ filters, onFiltersChange, onLoadMore }: any) => {
  return (
    <>
      <NotesFilter filters={filters} onChange={onFiltersChange} />
      <NotesListContainer filters={filters} onLoadMore={onLoadMore} />
      <NewNote />
    </>
  );
};

export default NotesPageView;
