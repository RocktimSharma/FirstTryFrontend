import * as React from "react"
import {cn} from "@/lib/utils"
import {SelectItem, SelectTrigger,} from "@/components/ui/select"

// ✅ Extend only the visible trigger (like input)
type SelectTriggerProps = React.ComponentProps<typeof SelectTrigger>

export const ExtendedSelectTrigger = React.forwardRef<
    React.ComponentRef<typeof SelectTrigger>,
    SelectTriggerProps
>(({className, ...props}, ref) => {
    return (
        <SelectTrigger
            ref={ref}
            className={cn(
                "shadow-none bg-transparent w-full text-xs text-muted-foreground/70 focus-visible:ring-0 focus-visible:border-accent border-border rounded-sm",
                className
            )}
            {...props}
        />
    )
})

ExtendedSelectTrigger.displayName = "ExtendedSelectTrigger"

type SelectItemProps = React.ComponentProps<typeof SelectItem>

export const ExtendedSelectItem = React.forwardRef<
    React.ComponentRef<typeof SelectItem>,
    SelectItemProps
>(({ className, ...props }, ref) => {
    return (
        <SelectItem
            ref={ref}
            className={cn(
                "focus:bg-primary/10 focus:text-primary",
                "data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary",
                className
            )}
            {...props}
        />
    )
})