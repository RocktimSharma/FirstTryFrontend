import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import {NavLink} from "react-router-dom";
import {sidebarItems} from "@lib/constants/sidebar-items.tsx";


import AccountPopover from "@components/layout/AppSidebar/AccountPopover.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@components/ui/avatar.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@components/ui/tooltip.tsx";


export function AppSidebar() {
    const {

        open,

        isMobile,

    } = useSidebar()
    return (
        <Sidebar className="data-[mobile=true]:border-r-0" collapsible={isMobile ? "offcanvas" : "icon"}>
            <SidebarContent className={`!border-none scrollbar-hide group-data-[collapsible=icon]:overflow-y-scroll`}>
                <div className={`sticky top-0 bg-primary z-50 pt-4 p-2 flex justify-between items-center`}>

                    {/*<SidebarTrigger></SidebarTrigger>*/}
                    {(open) && (
                        <div className="flex items-center gap-2 px-2 overflow-hidden">
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarImage
                                    src="profile.jpg"
                                    alt="Profile Image"
                                    className="grayscale"
                                />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-medium leading-tight truncate">
                                    Rocktim Sharma
                                </p>
                                <small className="text-xs font-light truncate">
                                    The App Name
                                </small>
                            </div>
                        </div>

                    )}

                    {/* Always show the sidebar trigger */}
                    <SidebarTrigger
                        className={`[&_svg:not([class*='size-'])]:size-6   [&_svg]:stroke-[1.5] hover:bg-transparent`}/>
                </div>


                {/* Groups */}
                {sidebarItems.map((group) => (
                    <SidebarGroup key={group.group}>
                        <SidebarGroupLabel
                            className={'!text-sidebar-foreground/80 font-light text-xs'}>{group.group}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild
                                                       className={`group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!`}>
                                        <div>
                                            <NavLink
                                                to={item.url}
                                                className={({isActive}) =>
                                                    `flex items-center gap-2  transition-all duration-200 text-sm  ${
                                                        isActive ? "!text-sidebar-foreground" : "!text-sidebar-foreground/90"
                                                    }`
                                                }
                                            >
                                                {/* ✅ Tooltip ONLY when sidebar is closed */}
                                                {!open ? (
                                                    <Tooltip >
                                                        <TooltipTrigger asChild>
                                                            {item.icon}
                                                        </TooltipTrigger>
                                                        <TooltipContent  side="left" >
                                                            <p>{item.title}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ) : (
                                                    item.icon
                                                )}

                                                {/* Title hidden when collapsed */}
                                                <span className="group-data-[collapsible=icon]:hidden">
                                                    {item.title}
                                                </span>
                                            </NavLink>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}


                <div className={`sticky bottom-0 bg-primary z-10`}>
                    <AccountPopover sidebarOpen={open}/>
                </div>


            </SidebarContent>
        </Sidebar>
    )
}