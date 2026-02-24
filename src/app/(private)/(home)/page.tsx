import { PageHeader } from "@/components/common/PageHeader";
import groupHome from "@/assets/group_home.svg";
import Image from "next/image";

export default function Home() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className="flex flex-col gap-2 items-center">
      <PageHeader title="Home" />

      <main className="w-full p-4 flex flex-col gap-2 bg-white">
        <h1 className="text-2xl font-bold text-heading">Olá Milena!</h1>
        <p className="text-sm font-semibold text-heading">{formattedDate}</p>

        <div className="flex-1 flex flex-col gap-2 justify-center items-center w-fit self-center">
          <Image src={groupHome} alt="Logo" width={400} />
          <div className="w-full px-4 py-2 border rounded-md border-heading text-center">
            <span className="text-md font-bold text-heading">Bem-vindo ao WenLock!</span>
          </div>
        </div>
      </main>
    </div>
  );
}
