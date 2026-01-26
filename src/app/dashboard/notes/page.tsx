import PageWrapper from "@/components/layout/page-wrapper";
import NotesPageContainer from "@/features/notes/components/notes-page/notes-page.container";
import { normalizeNoteQuery } from "@/lib/utils/normalize-note-query";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialFilters = normalizeNoteQuery(params);

  return (
    <PageWrapper>
      <NotesPageContainer initialFilters={initialFilters} />
    </PageWrapper>
  );
}
