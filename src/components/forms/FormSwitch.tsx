import {type Control, Controller, type FieldValues, type Path} from "react-hook-form";
import {Switch} from "@components/ui/switch.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {cn} from "@lib/utils.ts";
import type {ComponentPropsWithoutRef} from "react";

// We extend the FormField props to automatically include label, error, description, etc.
interface FormSwitchProps<T extends FieldValues> extends Omit<ComponentPropsWithoutRef<typeof FormField>, 'children'> {
    name: Path<T>;
    control: Control<T>;
    switchProps?: ComponentPropsWithoutRef<typeof Switch>;
}

export const FormSwitch = <T extends FieldValues>({
                                                      name,
                                                      control,
                                                      className,
                                                      switchProps,
                                                      ...formFieldProps // Spreads label, error, description, etc.
                                                  }: FormSwitchProps<T>) => {
    return (
        <FormField
            {...formFieldProps}
            className={cn(
                "flex flex-row justify-between items-center p-4 rounded-sm border",
                className
            )}
        >
            <Controller
                control={control}
                name={name}
                render={({field}) => (
                    <Switch
                        {...switchProps}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={cn(
                            "data-[state=unchecked]:bg-border data-[state=unchecked]:border-border border [&>span]:bg-input",
                            switchProps?.className
                        )}
                    />
                )}
            />
        </FormField>
    );
};