
import { Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {Button} from "@components/ui/button.tsx";

interface PrimaryButtonProps {
    label: string;
    icon?: LucideIcon;
    className?: string;
}

export function PrimaryButton({
                                  label,
                                  icon: Icon = Plus,
                                  className,
                                  ...props
                              }: PrimaryButtonProps) {
    return (
        <Button
            className={cn("rounded-sm shadow-none text-xs gap-2", className)}
            variant="default"
            {...props}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Button>
    );
}