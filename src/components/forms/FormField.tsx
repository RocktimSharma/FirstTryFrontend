import * as React from "react"
import {Label} from "@/components/ui/label"
import {cn} from "@/lib/utils"

interface FormFieldProps {
    label: string
    children: React.ReactNode
    className?: string
    required?: boolean
    error?: string
}

export function FormField({
                              label,
                              children,
                              className,
                              required = false,
                              error,
                          }: FormFieldProps) {
    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <Label className="text-xs text-muted-foreground flex gap-0.5">
                {label}
                {required && <span className="text-destructive">*</span>}
            </Label>

            {children}

            {error && (
                <p className="text-xs text-destructive mt-1">
                    {error}
                </p>
            )}
        </div>
    )
}
