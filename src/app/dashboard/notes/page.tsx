import PageWrapper from "@/components/layout/page-wrapper";
import NotesPage from "@/components/notes/notes-page";
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
      <NotesPage initialFilters={initialFilters} />
    </PageWrapper>
  );
}
