import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";
import { ChevronsUpDown, LogOut, PlusCircle, Users } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandList } from "@components/ui/command";
import {useClerk} from "@clerk/clerk-react";

interface AccountPopoverProps {
    sidebarOpen?: boolean;
}

export const AccountPopover = ({ sidebarOpen = true }: AccountPopoverProps) => {
    const [open, setOpen] = useState(false);
    const { signOut } = useClerk()
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Account Action"
                    className={cn(
                        "h-14 rounded-sm flex items-center justify-between px-4 py-2 mx-2 mb-2 w-[calc(100%-1rem)]",
                        "text-secondary-foreground bg-secondary border-none",
                        sidebarOpen
                            ? "text-left hover:bg-secondary/80"
                            : "justify-center m-auto w-10 p-0 border-none bg-transparent hover:bg-transparent hover:text-secondary-foreground"
                    )}
                >
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage src="profile.jpg" alt="Profile Image" className="grayscale" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>

                        {sidebarOpen && (
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-medium leading-tight truncate">Rocktim Sharma</p>
                                <small className="text-xs font-light truncate">rocktimsharma@myapp.com</small>
                            </div>
                        )}
                    </div>

                    {sidebarOpen && <ChevronsUpDown className="h-4 w-4 opacity-60 shrink-0" />}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className={cn("p-0 !bg-secondary text-secondary-foreground border-none", sidebarOpen ?  "w-[var(--radix-popover-trigger-width)]" : "w-[var(--sidebar-width)] ml-2")}
            >
                <Command className="bg-secondary text-secondary-foreground">
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    signOut({ redirectUrl: "/login" });
                                }}

                                className="text-secondary-foreground bg-destructive data-[selected=true]:bg-destructive/80 !data-[selected=true]:text-foreground hover:text-foreground">
                                <LogOut strokeWidth={2} className="text-secondary-foreground rotate-180" />
                                Logout
                            </CommandItem>
                            <CommandItem className="text-secondary-foreground data-[selected=true]:bg-background/10 data-[selected=true]:text-secondary-foreground">
                                <PlusCircle strokeWidth={2} className="text-secondary-foreground" />
                                Create Account
                            </CommandItem>

                            <CommandItem className="text-secondary-foreground data-[selected=true]:bg-background/10 data-[selected=true]:text-secondary-foreground">
                                <Users strokeWidth={2} className="text-secondary-foreground" />
                                Switch Account
                            </CommandItem>


                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default AccountPopover;
