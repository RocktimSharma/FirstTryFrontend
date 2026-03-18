import * as React from "react"
import {Label} from "@/components/ui/label"
import {cn} from "@/lib/utils"
import type {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

interface FormFieldProps {
    label: string
    children: React.ReactNode
    className?: string
    required?: boolean
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | string
}

export function FormField({
                              label,
                              children,
                              className,
                              required = false,
                              error,
                          }: FormFieldProps) {
    const errorMessage = typeof error === 'string'
        ? error
        : (error as FieldError)?.message;
    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <Label className="text-xs  flex gap-0.5">
                {label}
                {required && <span className="text-destructive">*</span>}
            </Label>

            {children}

            {error && (
                <p className="text-xs text-destructive mt-1">
                    {errorMessage}
                </p>
            )}
        </div>
    )
}
