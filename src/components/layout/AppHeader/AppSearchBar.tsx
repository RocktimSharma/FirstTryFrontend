import {useState} from "react"
import {Input} from "@components/ui/input"
import {Popover, PopoverTrigger} from "@components/ui/popover"
import {Button} from "@components/ui/button.tsx";
import {Search} from "lucide-react";


const AppSearchBar = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>

                <div> {/* fixed width or use w-full for flexible */}
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."

                        className="rounded-full w-full text-xs hidden focus-visible:border-primary lg:block h-9 bg-card" // w-full fills the wrapper
                        onFocus={() => setOpen(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setOpen(false)
                        }}
                    />
                    <Button
                        size="icon"
                        className="lg:hidden bg-card text-secondary hover:bg-card/60 shadow-none rounded-full"
                        onClick={() => setOpen(true)}
                    >
                        <Search color="#727272" strokeWidth={1}/>
                    </Button>
                </div>

            </PopoverTrigger>

            {/*<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">*/}
            {/*    /!*<Command>*!/*/}
            {/*    /!*    <CommandInput placeholder="Type a command or search..." />*!/*/}
            {/*    /!*    <CommandList>*!/*/}
            {/*    /!*        <CommandEmpty>No results found.</CommandEmpty>*!/*/}
            {/*    /!*        <CommandGroup heading="Suggestions">*!/*/}
            {/*    /!*            <CommandItem>Calendar</CommandItem>*!/*/}
            {/*    /!*            <CommandItem>Search Emoji</CommandItem>*!/*/}
            {/*    /!*            <CommandItem>Calculator</CommandItem>*!/*/}
            {/*    /!*        </CommandGroup>*!/*/}
            {/*    /!*        <CommandSeparator />*!/*/}
            {/*    /!*        <CommandGroup heading="Settings">*!/*/}
            {/*    /!*            <CommandItem>Profile</CommandItem>*!/*/}
            {/*    /!*            <CommandItem>Billing</CommandItem>*!/*/}
            {/*    /!*            <CommandItem>Settings</CommandItem>*!/*/}
            {/*    /!*        </CommandGroup>*!/*/}
            {/*    /!*    </CommandList>*!/*/}
            {/*    /!*</Command>*!/*/}
            {/*</PopoverContent>*/}
        </Popover>

    )
}

export default AppSearchBar
