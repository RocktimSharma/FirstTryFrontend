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


import {Avatar, AvatarFallback, AvatarImage} from "@components/ui/avatar.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@components/ui/tooltip.tsx";
import {useClerk} from "@clerk/clerk-react";
import {Button} from "@components/ui/button.tsx";
import {LogOut} from "lucide-react";


export function AppSidebar() {
    const {

        open,

        isMobile,

    } = useSidebar()
    const { signOut } = useClerk()
    return (
        <Sidebar className="data-[mobile=true]:border-r-0  border-none" collapsible={isMobile ? "offcanvas" : "icon"}>
            <SidebarContent className={`!border-none scrollbar-hide group-data-[collapsible=icon]:overflow-y-scroll`}>
                <div className={`sticky top-0  z-50 pt-4 p-2 flex justify-between items-center bg-sidebar`}>

                    {/*<SidebarTrigger></SidebarTrigger>*/}
                    {(open) && (
                        <div className="flex items-center gap-2 px-2 overflow-hidden ">
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarImage
                                    src="profile.jpg"
                                    alt="Profile Image"
                                />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0 text-sidebar-primary-foreground">
                                <p className="text-sm font-semibold leading-tight truncate">
                                    Business Name
                                </p>
                                <small className="text-xs  truncate">
                                    The App Name
                                </small>
                            </div>
                        </div>

                    )}

                    {/* Always show the sidebar trigger */}
                    <SidebarTrigger
                        className={`[&_svg:not([class*='size-'])]:size-6   [&_svg]:stroke-[1] hover:bg-transparent hover:text-sidebar-foreground`}/>
                </div>

                <hr className="hidden group-data-[collapsible=icon]:block  mx-2" />
                {/* Groups */}
                {sidebarItems.map((group, index) => (<>
                    <SidebarGroup key={group.group}>
                        <SidebarGroupLabel
                            className={'!text-sidebar-primary-foreground  text-xs'}>{group.group}</SidebarGroupLabel>
                        <SidebarMenu className={'px-2 group-data-[collapsible=icon]:px-0'}>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>

                                            <NavLink
                                                to={item.url}
                                                className={({isActive}) =>
                                                    `flex hover:bg-sidebar-accent/2  items-center rounded-sm group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center py-2 px-2 gap-2  transition-all duration-200 text-sm  ${
                                                        isActive ? "!bg-sidebar-accent !text-sidebar-accent-foreground" : "!text-sidebar-foreground"
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


                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                        {index !== sidebarItems.length - 1 &&   <hr className="hidden group-data-[collapsible=icon]:block  mx-2" />}
                    </>
                ))}


                {/*<div className={`sticky bg-sidebar bottom-0 rounded-md shadow-md  p-4  z-10 text-sidebar-primary-foreground`}>*/}
                {/*    /!*<div className={'grid grid-cols-2 p-2'}>*!/*/}
                {/*    /!*    <div>*!/*/}
                {/*    /!*        <input type={'radio'}/>*!/*/}
                {/*    /!*        <label> Light</label>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*    /!*    <div>*!/*/}
                {/*    /!*        <input type={'radio'}/>*!/*/}
                {/*    /!*        <label> Dark </label>*!/*/}
                {/*    /!*    </div>*!/*/}

                {/*    /!*</div>*!/*/}
                {/*    /!*<AccountPopover sidebarOpen={open}/>*!/*/}
                {/*    <div className="flex items-center gap-2 overflow-hidden">*/}
                {/*        <Avatar className="h-8 w-8 shrink-0">*/}
                {/*            <AvatarImage src="profile.jpg" alt="Profile Image" className="grayscale" />*/}
                {/*            <AvatarFallback>SC</AvatarFallback>*/}
                {/*        </Avatar>*/}

                {/*        {open && (*/}

                {/*                <div className="flex flex-col min-w-0">*/}
                {/*                    <p className="text-sm font-medium leading-tight truncate">Rocktim Sharma</p>*/}
                {/*                    <small className="text-xs font-light truncate">rocktimsharma@myapp.com</small>*/}

                {/*                </div>*/}


                {/*        )}*/}
                {/*        <Button  className={'bg-transparent text-foreground shadow-none'} size={'icon'}   onSelect={() => {*/}
                {/*            signOut({ redirectUrl: "/login" });*/}
                {/*        }}>*/}
                {/*            <LogOut strokeWidth={2}  />*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</div>*/}


            </SidebarContent>
        </Sidebar>
    )
}