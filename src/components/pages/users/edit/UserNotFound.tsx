"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function UserNotFound() {
  const route = useRouter();

  function handleGoBack() {
    route.push("/users");
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl font-bold">Usuário não encontrado</h1>
      <Button
        onClick={handleGoBack}
        className="bg-brand hover:bg-brand/90 text-white"
      >
        Voltar para a lista de usuários
      </Button>
    </div>
  );
}
