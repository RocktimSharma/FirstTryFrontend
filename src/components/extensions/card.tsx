import * as React from "react"
import {Card, CardHeader, CardContent, CardAction, CardTitle, CardDescription, CardFooter} from "@/components/ui/card"
import {cn} from "@/lib/utils"


interface ExtendedCardProps extends React.ComponentProps<typeof Card> {
}

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

interface ExtendedCardContentProps extends React.ComponentProps<typeof CardContent> {}
export function ExtendedCardContent({className, ...props}: ExtendedCardContentProps) {
    return (
        <CardContent
            // Change "p-4" to whatever padding you desire (e.g., p-2, p-6, pt-0)
            className={cn("px-4 sm:px-6", className)}
            {...props}
        />
    )
}

ExtendedCardContent.displayName = "ExtendedCardContent"


export {
    ExtendedCard as Card,
    CardHeader,
    ExtendedCardContent as CardContent,
    CardAction,
    CardTitle,
    CardDescription,
    CardFooter,
}