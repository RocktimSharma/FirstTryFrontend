// src/components/ui/extensions/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// Derive props from the real Input component
type InputProps = React.ComponentProps<typeof Input>;

export const ExtendedInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                className={cn(
                    // <- put the extra classes you want here:
                    "shadow-none  placeholder:text-xs placeholder:text-muted-foreground/70 bg-transparent focus-visible:ring-0 focus-visible:border-accent border-border rounded-sm",
                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    className
                )}
                {...props}
            />
        );
    }
);

ExtendedInput.displayName = "ExtendedInput";
