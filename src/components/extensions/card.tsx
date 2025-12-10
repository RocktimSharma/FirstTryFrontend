import * as React from "react"
import {Card} from "@/components/ui/card"
import {cn} from "@/lib/utils"


interface ExtendedCardProps extends React.ComponentProps<typeof Card> {
}

export function ExtendedCard({
                                 className,
                                 ...props
                             }: ExtendedCardProps) {
    return (
        <Card
            className={cn(
                "rounded-sm shadow-none border border-border ",
                className
            )}
            {...props}
        />
    )
}


ExtendedCard.displayName = "ExtendedCard";