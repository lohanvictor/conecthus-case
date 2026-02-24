"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SIDEBAR_ITEMS, SidebarItem } from "./sidebar";

function isItemActive(item: SidebarItem, pathname: string): boolean {
  if (item.href) return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  if (item.items) return item.items.some((child) => isItemActive(child, pathname));
  return false;
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 relative">
        <span className="text-lg font-bold text-white">
          <span className="group-data-[collapsible=icon]:hidden">WenLock</span>
          <span className="hidden group-data-[collapsible=icon]:block">WL</span>
        </span>
        <SidebarTrigger className="absolute right-[-16px] top-1/2 -translate-y-1/2" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) =>
                item.items ? (
                  <Collapsible
                    key={item.label}
                    defaultOpen={isItemActive(item, pathname)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                          <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((child) => (
                            <SidebarMenuSubItem key={child.label}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isItemActive(child, pathname)}
                              >
                                <Link href={child.href!}>
                                  <child.icon className="size-4" />
                                  <span>{child.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isItemActive(item, pathname)}
                    >
                      <Link href={item.href!}>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
