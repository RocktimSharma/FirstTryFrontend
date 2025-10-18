"use client"

import * as React from "react"


import {cn} from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@components/ui/avatar"
import {Button} from "@components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover"
import {SidebarTrigger} from "@components/ui/sidebar.tsx";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface EntitySwitcherProps extends PopoverTriggerProps {
}

export default function EntitySwitcher({className}: EntitySwitcherProps) {
    const [open, setOpen] = React.useState(false)


    return (

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn("text-left w-full hover:bg-primary hover:text-primary-foreground text-lg bg-primary border-none text-primary-foreground justify-between", className)}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
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
                        <SidebarTrigger />
                        {/*<ChevronsUpDown className="ml-auto opacity-50"/>*/}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 !bg-secondary text-secondary-foreground border-none w-[var(--radix-popover-trigger-width)]"
                >
                    {/*<Command className={`bg-secondary `}>*/}
                    {/*    <CommandInput placeholder="Search entity..."/>*/}
                    {/*    <CommandList >*/}
                    {/*        <CommandEmpty>No Enitity found.</CommandEmpty>*/}
                    {/*        {groups.map((group) => (*/}
                    {/*            <CommandGroup key={group.label} heading={group.label}           className="text-xs text-secondary-foreground/90">*/}
                    {/*                {group.entities.map((team) => (*/}
                    {/*                    <CommandItem*/}
                    {/*                        key={team.value}*/}
                    {/*                        onSelect={() => {*/}
                    {/*                            setSelectedEntity(team)*/}
                    {/*                            setOpen(false)*/}
                    {/*                        }}*/}
                    {/*                        className="text-sm text-secondary-foreground"*/}
                    {/*                    >*/}
                    {/*                        <Avatar className="mr-2 h-5 w-5">*/}
                    {/*                            <AvatarImage*/}
                    {/*                                src={`https://avatar.vercel.sh/${team.value}.png`}*/}
                    {/*                                alt={team.label}*/}
                    {/*                                className="grayscale"*/}
                    {/*                            />*/}
                    {/*                            <AvatarFallback>SC</AvatarFallback>*/}
                    {/*                        </Avatar>*/}
                    {/*                        {team.label}*/}
                    {/*                        <Check*/}
                    {/*                            className={cn(*/}
                    {/*                                "ml-auto",*/}
                    {/*                                selectedEntity.value === team.value*/}
                    {/*                                    ? "opacity-100"*/}
                    {/*                                    : "opacity-0"*/}
                    {/*                            )}*/}
                    {/*                        />*/}
                    {/*                    </CommandItem>*/}
                    {/*                ))}*/}
                    {/*            </CommandGroup>*/}
                    {/*        ))}*/}
                    {/*    </CommandList>*/}
                    {/*    <CommandSeparator/>*/}
                    {/*    <CommandList>*/}
                    {/*        <CommandGroup>*/}
                    {/*            /!*<DialogTrigger asChild>*!/*/}
                    {/*                <CommandItem*/}
                    {/*                    // onSelect={() => {*/}
                    {/*                    //     setOpen(false)*/}
                    {/*                    //     setShowNewEntityDialog(true)*/}
                    {/*                    // }}*/}
                    {/*                    className="text-sm text-secondary-foreground"*/}
                    {/*                >*/}
                    {/*                    <PlusCircle className="h-5 w-5"/>*/}
                    {/*                    Create Entity*/}
                    {/*                </CommandItem>*/}
                    {/*            /!*</DialogTrigger>*!/*/}
                    {/*        </CommandGroup>*/}
                    {/*    </CommandList>*/}
                    {/*</Command>*/}
                </PopoverContent>
            </Popover>


    )
}