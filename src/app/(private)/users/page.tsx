import { UsersPage } from "@/components/pages/users";
import { getUsers } from "@/services/userService";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: number;
  }>;
}

export default async function Users(props: Props) {
  const { search, page } = await props.searchParams;
  const { items, ...pagination } = await getUsers(search, page);
  return <UsersPage users={items} pagination={pagination} />;
}
