import { UsersPage } from "@/components/pages/users";
import { getUsers } from "@/services/UserService";

type Props = {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function Users(props: Props) {
  const { search } = await props.searchParams;
  const users = await getUsers(search);
  return <UsersPage users={users} />;
}
