import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import "../globals.css";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center px-4 bg-surface">
          <SidebarTrigger className="cursor-pointer" />
        </header>
        <div className="p-4 bg-surface h-full w-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
