"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { UserForm } from "../UserForm";
import { useRouter } from "next/navigation";
import { callApi } from "@/lib/callApi";
import { CreateUser, User } from "@/services/userService";

type Props = {};

export function CreateUserPage() {
  const router = useRouter();

  async function handleCreateUser(user: Partial<User>) {
    const { error } = await callApi("/api/users", {
      method: "POST",
      body: user,
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
        title="Criar Usuário"
        path={[
          { label: "Usuários", href: "/users" },
          { label: "Cadastro de Usuário", href: "#" },
        ]}
        canBack
      />

      <UserForm onSuccess={handleCreateUser} onCancel={() => router.push("/users")} />
    </div>
  );
}
