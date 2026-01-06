import PageWrapper from "@/components/layout/page-wrapper";
import { ViewNote } from "@/components/notes/view";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <PageWrapper>
      <ViewNote id={id} />
    </PageWrapper>
  );
};

export default page;