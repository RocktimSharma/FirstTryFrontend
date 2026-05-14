import {Controller, useFormContext, useWatch} from "react-hook-form";
import {Select, SelectContent, SelectValue} from "@components/ui/select.tsx";
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import {ExtendedTextarea} from "@components/extensions/textarea.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {TaxExemptionTypeEnum, type TaxFormValues} from "@features/fms/taxes/types";

export const ExemptionFields = () => {
    // Grab everything directly from the context
    const {register, control, formState: {errors}} = useFormContext<TaxFormValues>();

    // Isolate the re-render for just this sub-section
    const isExempt = useWatch({
        control,
        name: "compliance.is_exempt",
    });

    if (!isExempt) return null;

    return (
        <div
            className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <FormField
                label="Exemption Type"
                required
                error={errors.compliance?.exemption_type}
            >
                <Controller
                    control={control}
                    name="compliance.exemption_type"
                    render={({field}) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <ExtendedSelectTrigger>
                                <SelectValue placeholder="Select reason..."/>
                            </ExtendedSelectTrigger>
                            <SelectContent>
                                {TaxExemptionTypeEnum.options.map((option) => (
                                    <ExtendedSelectItem key={option} value={option}>
                                        {option.replace(/_/g, " ")}
                                    </ExtendedSelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </FormField>

            <FormField
                label="Exemption Reason"
                error={errors.compliance?.exemption_reason}
            >
                <ExtendedTextarea
                    placeholder="Detailed explanation..."
                    {...register("compliance.exemption_reason")}
                />
            </FormField>
        </div>
    );
};