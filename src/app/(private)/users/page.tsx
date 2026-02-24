import { UsersPage } from "@/components/pages/users";
import { getUsers } from "@/services/UserService";

export default async function Users() {
  const users = await getUsers();
  return <UsersPage users={users} />;
}
