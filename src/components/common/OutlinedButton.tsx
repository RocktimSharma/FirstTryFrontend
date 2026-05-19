import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OutlinedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    hideTextOnMobile?: boolean; // Flag to hide text on mobile screens
    hideIconOnMobile?: boolean; // Flag to hide icon on mobile screens
    className?: string;
}

export function OutlinedButton({
                                    label,
                                    icon: Icon, // Removed default assignment here
                                    hideTextOnMobile = false,
                                    hideIconOnMobile = false,
                                    className,
                                    ...props
                                }: OutlinedButtonProps) {
    return (
        <Button
            className={cn(
                "rounded-sm shadow-none text-xs gap-2",
                // Adjust padding & layout if text gets hidden on mobile to maintain square aspect ratio
                hideTextOnMobile && Icon ? "h-9 w-9 p-0 sm:h-auto sm:w-auto sm:px-3" : "",
                className
            )}
            variant="outline"
            {...props}
        >
            {/* Render icon conditionally ONLY if it is passed as a prop */}
            {Icon && (
                <Icon
                    className={cn(
                        "h-4 w-4",
                        hideIconOnMobile ? "hidden sm:inline-block" : "",
                        // Remove right margin layout spacing if text is hidden on mobile
                        hideTextOnMobile ? "sm:mr-0" : ""
                    )}
                />
            )}

            {/* Render text, applying hidden classes if flag is active */}
            <span className={cn(hideTextOnMobile ? "hidden sm:inline" : "")}>
                {label}
            </span>
        </Button>
    );
}