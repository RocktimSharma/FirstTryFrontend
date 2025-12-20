import * as React from "react"
import {Card,CardHeader,CardContent,CardAction,CardTitle,CardDescription,CardFooter} from "@/components/ui/card"
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
                "rounded-sm gap-2 border-none shadow-none drop-shadow-xs ",
                className
            )}
            {...props}
        />
    )
}


ExtendedCard.displayName = "ExtendedCard";

export {
    CardHeader,
    CardContent,
    CardAction,
    CardTitle,
    CardDescription,
    CardFooter,
}