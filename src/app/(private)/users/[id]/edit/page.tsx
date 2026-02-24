"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditUser() {
  const router = useRouter();

  function handleGoBack() {
    router.push("/users");
  }

  return (
    <div className="flex justify-between items-center">
      <Button
        type="button"
        variant="outline"
        onClick={handleGoBack}
        className="bg-brand hover:bg-brand/90 text-white"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Página em construção. Por favor, volte para a página anterior.
      </Button>
    </div>
  );
}
