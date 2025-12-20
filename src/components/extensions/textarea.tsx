import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"


type ExtendedTextareaProps = React.ComponentProps<typeof Textarea>

export const ExtendedTextarea = React.forwardRef<
    HTMLTextAreaElement,
    ExtendedTextareaProps
>(({ className, ...props }, ref) => {
    return (
        <Textarea
            ref={ref}
            className={cn(
                "placeholder:text-xs placeholder:text-muted-foreground/70 shadow-none bg-transparent  focus-visible:ring-0 focus-visible:border-accent border-border rounded-sm",
                className
            )}
            {...props}
        />
    )
})

ExtendedTextarea.displayName = "ExtendedTextarea"
