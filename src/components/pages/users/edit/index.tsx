"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { UserForm } from "../UserForm";
import { useRouter } from "next/navigation";
import { User } from "@/services/usersService";
import { callApi } from "@/lib/callApi";

type Props = {
  user: Omit<User, "password">;
};

export function EditUserPage(props: Props) {
  const router = useRouter();

  async function handleEditUser(user: Partial<User>) {
    let body = user;
    if (!user.password) {
      const { password, ...userWithoutPassword } = user;
      body = userWithoutPassword;
    }
    const { error } = await callApi("/api/users/" + props.user.id, {
      method: "PATCH",
      body,
    });
    if (error) {
      alert(error.message);
      return;
    }
    router.push("/users");
  }
  return (
    <div className="space-y-1">
      <PageHeader
        title="Editar Usuário"
        path={[
          { label: "Usuários", href: "/users" },
          { label: "Editar Usuário", href: "#" },
        ]}
        canBack
      />

      <UserForm
        user={props.user}
        onSuccess={handleEditUser}
        onCancel={() => router.push("/users")}
        passwordOptional
      />
    </div>
  );
}
