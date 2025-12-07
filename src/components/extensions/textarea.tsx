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
                "shadow-none placeholder:text-secondary focus-visible:ring-0 focus-visible:border-secondary/60 border-border rounded-sm",
                className
            )}
            {...props}
        />
    )
})

ExtendedTextarea.displayName = "ExtendedTextarea"
