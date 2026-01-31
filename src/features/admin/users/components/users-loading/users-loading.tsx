import { TextShimmer } from "@/components/ui/text-shimmer";

const UsersLoading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <TextShimmer>Fetching Users...</TextShimmer>
    </div>
  );
};

export default UsersLoading;
