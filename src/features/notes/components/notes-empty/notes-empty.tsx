import EmptyState from "@/features/shared/ui/empty-state";
import { Plus } from "lucide-react";

type Props = {
  isFiltered: boolean;
};

const NotesEmpty = ({ isFiltered }: Props) => {
  return (
    <EmptyState
      icon={<Plus className="size-6 text-muted-foreground" />}
      title={isFiltered ? "No matching notes" : "No notes yet"}
      description={
        isFiltered
          ? "Try a different keyword or clear filters."
          : "Create your first note to get started."
      }
      actionLabel={isFiltered ? undefined : "New Note"}
      actionHref={isFiltered ? undefined : "/dashboard/notes/new"}
    />
  );
};

export default NotesEmpty;
