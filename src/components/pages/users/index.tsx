"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { User } from "@/services/UserService";
import { ViewUserSheet } from "./ViewUserSheet";

type Props = {
  users: User[];
};

export function UsersPage(props: Props) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<User | null>(null);

  function handleSearch(value: string) {
    setSearch(value);
  }

  const COLUMNS: TableColumn<User>[] = [
    {
      key: "name",
      label: "Nome",
    },
    {
      label: "Ações",
      key: "actions",
      classHeader: "w-40",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Button variant="link" size="sm" onClick={() => setSelectedUser(value)} className="cursor-pointer">
            <Eye className="size-4" />
          </Button>
          <Link href={`/users/${value.id}/edit`}>
            <Pencil className="size-4" />
          </Link>
          <Button variant="link" size="sm">
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

      <div className="flex items-center justify-between mt-4">
        <input
          type="text"
          placeholder="Pesquisar usuários..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0290A4] transition-colors w-72"
        />

        <Link
          className="text-white text-sm font-medium rounded-md px-4 py-2 cursor-pointer bg-[#0290A4] hover:bg-[#0290A4]/90"
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
            total: 3,
            onNextPage: () => null,
            onPreviousPage: () => null,
          }}
        />
      </main>
    </div>
  );
}
