"use client";

import { ChevronLeft } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  path?: {
    label: string;
    href: string;
  }[];
  canBack?: boolean;
};

export function PageHeader(props: Props) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="w-full flex flex-col gap-2">
      <Breadcrumb path={props.path ?? []} />
      <h1 className="text-2xl font-bold">
        {props.canBack && (
          <Button
            variant="link"
            onClick={handleBack}
            className="bg-transparent border-none w-fit cursor-pointer p-0! "
          >
            <ChevronLeft className="size-4" />
          </Button>
        )}{" "}
        {props.title}
      </h1>
    </header>
  );
}
