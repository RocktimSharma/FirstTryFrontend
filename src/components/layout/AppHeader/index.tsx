import {SidebarTrigger, useSidebar} from "@components/ui/sidebar.tsx";
import PageHeader from "@components/layout/AppHeader/PageHeader.tsx";
import TimeRangeSelector from "@components/layout/AppHeader/TimeRangeSelector.tsx";
import AppSearchBar from "@components/layout/AppHeader/AppSearchBar.tsx";
import {Button} from "@components/ui/button.tsx";
import {Bell, Settings} from "lucide-react";
import {Badge} from "@components/ui/badge.tsx";


const AppHeader = () => {
    const {
        isMobile,
    } = useSidebar()

    return (
        <div className={`flex justify-between items-center`}>
            <div className={'flex gap-1 items-center'}>
                {isMobile && <SidebarTrigger
                    className={`[&_svg:not([class*='size-'])]:size-6 hover:bg-transparent hover:text-foreground`}/>}
                <PageHeader/>
            </div>
            <div className={`hidden sm:block`}>
                <TimeRangeSelector/>
            </div>
            <div className={`flex gap-2 items-center`}>

                <AppSearchBar/>

                <Button size={"icon"} className={`bg-card rounded-full text-secondary hover:bg-card-60`}>
                    {/*<Bell strokeWidth={1}/>*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="#727272" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-bell-dot-icon lucide-bell-dot">
                        <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
                        <path
                            d="M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665"/>
                        <circle cx="18" cy="8" r="3" fill='red' stroke='red'/>
                    </svg>
                </Button>
                <Button size={"icon"} className={`bg-card rounded-full text-secondary hover:bg-card-60`}>
                    <Settings strokeWidth={1}/>
                </Button>
            </div>

        </div>
    );
};

export default AppHeader;