export interface SidebarItem {
    title: string;
    url: string;
    icon: ReactElement; // JSX element type
}

export interface SidebarItems {
    group: string;
    items: SidebarItem[];
}

