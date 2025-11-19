import {Toaster as BaseToaster, type ToasterProps} from "sonner"
import {CircleCheckBig, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon} from "lucide-react";


export const ExtendedToaster = ({ ...props }: ToasterProps) => {
    return (
        <BaseToaster
            icons={{
                success: <CircleCheckBig className="size-4 text-green-500" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4 text-red-500" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "var(--radius)",
                } as React.CSSProperties
            }
            {...props} // ← THIS enables richColors, position, duration, etc.
        />
    )
}
