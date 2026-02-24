"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export function UserNotFound() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-2xl font-bold">Usuário não encontrado</h1>
      <Button
        onClick={() => router.push("/users")}
        className="bg-brand hover:bg-brand/90 text-white"
      >
        Voltar para a lista de usuários
      </Button>
    </div>
  );
}
