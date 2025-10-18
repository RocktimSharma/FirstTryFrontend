import {SidebarProvider} from "@components/ui/sidebar"
import {AppSidebar} from "@components/layout/AppSidebar"

import {Outlet} from "react-router-dom";

import AppHeader from "@components/layout/AppHeader";

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className={`p-2 w-full h-[100dvh]`}>
                <AppHeader/>
                    <Outlet/>
            </main>
        </SidebarProvider>
);
};

export default DashboardLayout;