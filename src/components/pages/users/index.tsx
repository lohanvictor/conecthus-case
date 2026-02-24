"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/common/Button";
import { GenericTable } from "@/components/common/GenericTable";
import Link from "next/link";

export function UsersPage() {
  const [search, setSearch] = useState("");

  function handleSearch(value: string) {
    setSearch(value);
  }

  return (
    <div className="w-full h-full space-y-2">
      <PageHeader title="Usuários" />

      <div className="flex items-center justify-between mt-4">
        <input
          type="text"
          placeholder="Pesquisar usuários..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0290A4] transition-colors w-72"
        />

        <Link className="text-white text-sm font-medium rounded-md px-4 py-2 cursor-pointer bg-[#0290A4] hover:bg-[#0290A4]/90" href="/users/create">
          + Cadastrar Usuário
        </Link>
      </div>

      <main className="w-full flex">

        <GenericTable columns={[]} data={[]} emptyMessage="Nenhum usuário encontrado" pagination={{
          page: 1,
          total: 3,
          onNextPage: () => null,
          onPreviousPage: () => null,
        }} />
      </main>
    </div>
  );
}
