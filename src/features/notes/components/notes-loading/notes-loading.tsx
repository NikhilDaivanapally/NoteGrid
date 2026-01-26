import { TextShimmer } from "@/components/ui/text-shimmer";

const NotesLoading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <TextShimmer>Fetching Notes...</TextShimmer>
    </div>
  );
};

export default NotesLoading;
