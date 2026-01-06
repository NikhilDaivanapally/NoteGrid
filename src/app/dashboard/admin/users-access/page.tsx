import UsersFilter from "@/components/admin/users/users-filter";
import UsersPage from "@/components/admin/users/users-page";
import PageWrapper from "@/components/layout/page-wrapper";
import { normalizeUsersQuery } from "@/lib/utils/normalize-users-query";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {

  const params = await searchParams;
  const initialFilters = normalizeUsersQuery(params)

  return (
    // review breadcrumbs (dashboard > admin > users-access)
    <PageWrapper>
      <UsersPage initialFilters={initialFilters}/>
    </PageWrapper>
  );
}
