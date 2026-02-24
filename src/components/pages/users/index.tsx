"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/common/Button";

export function UsersPage() {
  const [search, setSearch] = useState("");

  function handleSearch(value: string) {
    setSearch(value);
  }

  return (
    <div>
      <PageHeader title="Usuários" />

      <div className="flex items-center justify-between mt-4">
        <input
          type="text"
          placeholder="Pesquisar usuários..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0290A4] transition-colors w-72"
        />

        <Button className="text-white text-sm font-medium rounded-md px-4 py-2 cursor-pointer transition-opacity hover:opacity-10 bg-[#0290A4]">
          + Cadastrar Usuário
        </Button>
      </div>
    </div>
  );
}
