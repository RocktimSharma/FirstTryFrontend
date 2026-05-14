import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Filter, RotateCcw } from "lucide-react";

export function COAFilters() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 px-3 text-xs">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="start">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">Filters</h4>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground">
                            <RotateCcw className="mr-1 h-3 w-3" />
                            Reset
                        </Button>
                    </div>

                    <Separator />

                    {/* Account Status */}
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</p>
                        <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="active" defaultChecked />
                                <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Active
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="inactive" />
                                <label htmlFor="inactive" className="text-sm font-medium leading-none">
                                    Inactive
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Account Level */}
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Account Level</p>
                        <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="group" />
                                <label htmlFor="group" className="text-sm font-medium leading-none">
                                    Group / Folders
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="ledger" />
                                <label htmlFor="ledger" className="text-sm font-medium leading-none">
                                    Ledger Accounts
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Custom Attributes */}
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Attributes</p>
                        <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="system" />
                                <label htmlFor="system" className="text-sm font-medium leading-none">
                                    System Defined
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="reconcilable" />
                                <label htmlFor="reconcilable" className="text-sm font-medium leading-none">
                                    Reconcilable
                                </label>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full text-xs h-8">Apply Filters</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}