import UsersPageContainer from "@/features/admin/users/components/users-page/users-page.container";
import { normalizeQueryWithDefaults } from "@/features/shared/lib/normalize-query";
import { DEFAULT_USERS_QUERY } from "@/lib/constants/users-query";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialFilters = normalizeQueryWithDefaults(
    params,
    DEFAULT_USERS_QUERY,
  );

  return <UsersPageContainer initialFilters={initialFilters} />;
}
