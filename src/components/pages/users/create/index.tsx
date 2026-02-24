import { PageHeader } from "@/components/common/PageHeader";
import { CreateUserForm } from "./CreateUserForm";

export function CreateUserPage() {
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

      <CreateUserForm />
    </div>
  );
}
