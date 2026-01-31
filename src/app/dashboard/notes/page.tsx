import NotesPageContainer from "@/features/notes/components/notes-page/notes-page.container";
import { DEFAULT_NOTE_QUERY } from "@/features/notes/constants";
import { normalizeQueryWithDefaults } from "@/features/shared/lib/normalize-query";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialFilters = normalizeQueryWithDefaults(params, DEFAULT_NOTE_QUERY);

  return <NotesPageContainer initialFilters={initialFilters} />;
}
