"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { User } from "@/services/UserService";
import { ViewUserSheet } from "./ViewUserSheet";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { SearchInput } from "@/components/common/SearchInput";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { callApi } from "@/lib/callApi";
import { useRouter } from "next/navigation";

type Props = {
  users: User[];
};

export function UsersPage(props: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<User | null>(
    null
  );
  const { updateSearch } = useCustomSearchParams();
  const router = useRouter();

  function handleSearch(value: string) {
    updateSearch(value);
  }

  async function handleDeleteUser(id: string) {
    setSelectedUserToDelete(null);
    const {error} = await callApi<null>("/api/users/" + id, {
      method: "DELETE",
    });
    if (error) {
      alert(error.message);
      return;
    }
    router.refresh();
  }

  const COLUMNS: TableColumn<User>[] = [
    {
      key: "name",
      label: "Nome",
      classHeader: "bg-table-header text-white rounded-tl-md rounded-bl-md",
    },
    {
      label: "Ações",
      key: "actions",
      classHeader: "w-40 bg-table-header text-white rounded-tr-md rounded-br-md",
      render: (user) => (
        <div className="flex items-center gap-2">
          <Button
            variant="link"
            size="sm"
            onClick={() => setSelectedUser(user)}
            className="cursor-pointer"
          >
            <Eye className="size-4" />
          </Button>
          <Link href={`/users/${user.id}/edit`}>
            <Pencil className="size-4 cursor-pointer" />
          </Link>
          <Button
            variant="link"
            size="sm"
            onClick={() => setSelectedUserToDelete(user)}
            className="cursor-pointer"
          >
            <Trash className="size-4" />
          </Button>
        </div>
      ),
    },
  ] as const;

  return (
    <div className="w-full h-full space-y-2">
      <PageHeader title="Usuários" />

      {selectedUser && (
        <ViewUserSheet
          open={!!selectedUser}
          onOpenChange={(open) => setSelectedUser(open ? props.users[0] : null)}
          user={selectedUser}
        />
      )}

      {selectedUserToDelete && (
        <ConfirmDialog
          open={!!selectedUserToDelete}
          onOpenChange={(open) =>
            setSelectedUserToDelete(open ? props.users[0] : null)
          }
          title="Deseja excluir?"
          description={`O usuário ${selectedUserToDelete.name} será excluído.`}
          cancelButton={{
            label: "Cancelar",
            onClick: () => setSelectedUserToDelete(null),
          }}
          confirmButton={{
            label: "Excluir",
            onClick: () => handleDeleteUser(selectedUserToDelete.id),
          }}
        />
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="max-w-[300px]">
          <SearchInput onChange={handleSearch} />
        </div>

        <Link
          className="text-white text-sm font-medium rounded-md px-4 py-2 cursor-pointer bg-brand hover:bg-brand/90"
          href="/users/create"
        >
          + Cadastrar Usuário
        </Link>
      </div>

      <main className="w-full flex">
        <GenericTable
          columns={COLUMNS}
          data={props.users}
          emptyMessage="Nenhum usuário encontrado"
          pagination={{
            page: 1,
            totalPages: 1,
            totalItems: 2,
            onFirstPage: () => null,
            onLastPage: () => null,
            onNextPage: () => null,
            onPreviousPage: () => null,
          }}
        />
      </main>
    </div>
  );
}
