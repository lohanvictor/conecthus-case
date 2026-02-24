import { EditUserPage } from "@/components/pages/users/edit";
import { UserNotFound } from "@/components/pages/users/edit/UserNotFound";
import { getUserById } from "@/services/usersService";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditUser({ params }: Props) {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) {
    return <UserNotFound />;
  }

  return (
    <EditUserPage
      user={{
        id: user.id,
        name: user.name,
        registration: user.registration,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }}
    />
  );
}
