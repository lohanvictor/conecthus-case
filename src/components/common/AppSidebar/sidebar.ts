import { ChartPie, LucideIcon, UserSquare } from "lucide-react";

export type SidebarItem = {
    label: string;
    icon: LucideIcon;
    href?: string;
    items?: SidebarItem[];
};

export const SIDEBAR_ITEMS = [
    {
        label: "Home",
        icon: ChartPie,
        href: "/",
    },
    {
        label: "Controle de Acesso",
        icon: UserSquare,
        items: [
            {
                label: "Usuários",
                icon: UserSquare,
                href: "/users",
            },
        ],
    }
];