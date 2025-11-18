import {SidebarProvider} from "@components/ui/sidebar"
import {AppSidebar} from "@components/layout/AppSidebar"

import {Outlet} from "react-router-dom";

import AppHeader from "@components/layout/AppHeader";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";

const DashboardLayout = () => {
    return (

        <>
            <SignedIn><SidebarProvider>
                <AppSidebar/>
                <main className={`p-2 w-full h-[100dvh]`}>
                    <AppHeader/>
                    <Outlet/>
                </main>
            </SidebarProvider>
            </SignedIn>
            <SignedOut>
                {/* Redirect unauthenticated users to the login page */}
                <RedirectToSignIn/>
            </SignedOut>
        </>

    );
};

export default DashboardLayout;