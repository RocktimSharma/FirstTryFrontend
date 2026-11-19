
export type UserRole = "owner" | "manager" | "cashier";
export interface SidebarItem {
    title: string;
    url: string;
    icon: ReactElement; // JSX element type
    roles: UserRole[];
}

export interface SidebarItems {
    group: string;
    items: SidebarItem[];
}

