import { ViewNote } from "@/features/notes/components/note-view/note-view";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ViewNote id={id} />;
};

export default page;
