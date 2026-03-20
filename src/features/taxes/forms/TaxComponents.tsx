// This component handles the 'components' array inside a specific Rate

import {Controller, useFieldArray} from "react-hook-form";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Button} from "@components/ui/button.tsx";
import {Plus, Trash2} from "lucide-react";
import {Select, SelectContent, SelectValue} from "@components/ui/select.tsx";
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import {TaxAppliesToEnum, TaxComponentTypeEnum} from "@features/taxes/types";
import {cn} from "@lib/utils.ts";

const TaxComponents = ({rateIndex, control, register, errors}: any) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: `rates.${rateIndex}.components`, // Path to the nested array
    });

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Tax Components</p>
                <Button
                    type="button"
                    variant="ghost"
                    className={'text-accent'}
                    size="sm"
                    onClick={() => append({name: "", percentage: 0})}
                >
                    <Plus className="mr-1 h-3 w-3"/> Add Component
                </Button>
            </div>

            {fields.map((field, subIndex) => (
                <div className={'flex flex-col md:flex-row items-stretch md:items-end justify-between  gap-2 bg-card p-3 md:p-4 rounded-sm'}>
                    <div key={field.id}
                         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 items-end rounded">
                        <FormField
                            label="Name"
                            error={errors?.rates?.[rateIndex]?.components?.[subIndex]?.name}
                        >
                            <ExtendedInput
                                {...register(`rates.${rateIndex}.components.${subIndex}.name`)}
                                placeholder="e.g. CGST"
                            />
                        </FormField>

                        <FormField
                            label="Rate (%)"
                            error={errors?.rates?.[rateIndex]?.components?.[subIndex]?.percentage}
                        >
                            <ExtendedInput
                                type="number"
                                {...register(`rates.${rateIndex}.components.${subIndex}.percentage`, {valueAsNumber: true})}
                            />
                        </FormField>
                        <FormField label="Type" required={true}
                                   error={errors?.rates?.[rateIndex]?.components?.[subIndex]?.component_type}>
                            <Controller
                                control={control}
                                name={`rates.${rateIndex}.components.${subIndex}.component_type` as const}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <ExtendedSelectTrigger>
                                            <SelectValue placeholder="Select Type"/>
                                        </ExtendedSelectTrigger>
                                        <SelectContent>
                                            {/* You can map through your Enum values here */}
                                            {TaxComponentTypeEnum.options.map((option) => (
                                                <ExtendedSelectItem key={option} value={option}>
                                                    {option.replace("_", " ")}
                                                </ExtendedSelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </FormField>
                        <FormField label="Type" required={true}
                                   error={errors?.rates?.[rateIndex]?.components?.[subIndex]?.applies_to}>
                            <Controller
                                control={control}
                                name={`rates.${rateIndex}.components.${subIndex}.applies_to` as const}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <ExtendedSelectTrigger>
                                            <SelectValue placeholder="Select Type"/>
                                        </ExtendedSelectTrigger>
                                        <SelectContent>
                                            {/* You can map through your Enum values here */}
                                            {TaxAppliesToEnum.options.map((option) => (
                                                <ExtendedSelectItem key={option} value={option}>
                                                    {option.replace("_", " ")}
                                                </ExtendedSelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </FormField>


                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => remove(subIndex)}
                        className={cn(
                            "text-destructive hover:bg-destructive/10",
                            // Mobile styles: Full width, visible text
                            "w-full md:w-auto flex items-center justify-center gap-2 border md:border-none",
                            // Desktop styles: Icon only (assuming icon-size button)
                            "md:h-10 md:w-10"
                        )}
                    >
                        <Trash2 className="h-4 w-4"/>
                        <span className="md:hidden text-xs font-medium uppercase tracking-wider">Remove Component</span>
                    </Button>
                </div>
            ))}
        </div>
    );
};
export default TaxComponents