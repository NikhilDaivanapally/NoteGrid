import EmptyState from "@/features/shared/ui/empty-state";
import { UserPlus } from "lucide-react";

type Props = {
  isFiltered: boolean;
};

const UsersEmpty = ({ isFiltered }: Props) => {
  return (
    <EmptyState
      icon={<UserPlus className="size-6 text-muted-foreground" />}
      title={isFiltered ? "No matching users" : "No Users yet"}
      description={
        isFiltered
          ? "Try a different keyword or clear filters."
          : "Create your first user"
      }
    />
  );
};

export default UsersEmpty;
