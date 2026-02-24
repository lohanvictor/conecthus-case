"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { SectionTitle } from "@/components/common/SectionTitle";
import { X } from "lucide-react";
import { User } from "@/services/UserService";

interface ViewUserSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

export function ViewUserSheet({
  open,
  onOpenChange,
  user,
}: ViewUserSheetProps) {
  if (!user) return null;

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent showCloseButton={false} className="sm:max-w-md">
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle>Visualizar Usuário</SheetTitle>
          <SheetClose className="rounded-sm opacity-70 transition-opacity hover:opacity-100 cursor-pointer">
            <X className="size-5" />
            <span className="sr-only">Fechar</span>
          </SheetClose>
        </SheetHeader>

        <SheetDescription className="sr-only">
          Detalhes do usuário selecionado
        </SheetDescription>

        <div className="flex flex-col gap-6 px-4 pb-4">
          <section className="space-y-4">
            <SectionTitle title="Dados do Usuário" />
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Nome" value={user.name} />
              <InfoItem label="Matrícula" value={user.registration} />
            </div>
            <InfoItem label="E-mail" value={user.email} />
          </section>

          <section className="space-y-4">
            <SectionTitle title="Detalhes" />
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Data de criação" value={formatDate(user.createdAt)} />
              <InfoItem label="Última edição" value={formatDate(user.updatedAt)} />
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
