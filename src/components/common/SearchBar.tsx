import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {ExtendedInput} from "@components/extensions/input.tsx";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onClear?: () => void;
    containerClassName?: string;
    placeholder?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
    ({ className, containerClassName, value,placeholder, onChange, onClear, ...props }, ref) => {
        // Check if there is text to show the clear button
        const hasValue = value && value.toString().length > 0;

        const handleClear = () => {
            if (onClear) {
                onClear();
            }
        };

        return (
            <div className={cn("relative w-full max-w-sm", containerClassName)}>
                {/* Search Icon */}
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <ExtendedInput
                    {...props}
                    ref={ref}
                    value={value}
                    placeholder={placeholder || "Search"}
                    onChange={onChange}
                    className={cn(
                        "pl-9 pr-9", // Extra padding for icons
                        className
                    )}
                />

                {/* Clear Button (Visible only when typing) */}
                {hasValue && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-transparent"
                        onClick={handleClear}
                    >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        <span className="sr-only">Clear search</span>
                    </Button>
                )}
            </div>
        );
    }
);

SearchBar.displayName = "SearchBar";