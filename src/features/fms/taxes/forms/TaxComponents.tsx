// This component handles the 'components' array inside a specific Rate

import {Controller, useFieldArray} from "react-hook-form";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Button} from "@components/ui/button.tsx";
import {Plus, Trash2} from "lucide-react";
import {Select, SelectContent, SelectValue} from "@components/ui/select.tsx";
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import {TaxAppliesToEnum, TaxComponentTypeEnum} from "@features/fms/taxes/types";
import {memo} from "react";

const ComponentRow = memo(({ register, errors, rateIndex, subIndex, onRemove, control }: any) => {

    return (


                <div
                     className={'flex flex-col md:flex-row items-stretch md:items-end justify-between  gap-2 bg-background p-3 md:p-4 rounded-sm'}>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 items-end rounded">
                        <FormField
                            label="Name"
                            error={errors?.name}
                        >
                            <ExtendedInput
                                {...register(`rates.${rateIndex}.components.${subIndex}.name`)}
                                placeholder="e.g. CGST"
                            />
                        </FormField>

                        <FormField
                            label="Rate (%)"
                            error={errors?.percentage}
                        >
                            <ExtendedInput
                                type="number"
                                {...register(`rates.${rateIndex}.components.${subIndex}.percentage`, {valueAsNumber: true})}
                            />
                        </FormField>
                        <FormField label="Type" required={true}
                                   error={errors?.component_type}>
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
                        <FormField label="Applies To" required={true}
                                   error={errors?.applies_to}>
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
                                            <SelectValue placeholder="Applies to"/>
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
                        onClick={() => onRemove(subIndex)}
                        className="text-destructive w-full md:w-10"
                    >
                        <Trash2 className="h-4 w-4"/>
                        <span className="md:hidden ml-2">Remove</span>
                    </Button>
                </div>

    );
}, (prev, next) => {
    return (
        prev.subIndex === next.subIndex &&
        prev.error === next.error // Shallow reference check
    );
});


const TaxComponents = ({rateIndex, control, register, errors}: any) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: `rates.${rateIndex}.components`,
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
            {/* Header ... */}
            {fields.map((field, subIndex) => (
                <ComponentRow
                    key={field.id}
                    subIndex={subIndex}
                    rateIndex={rateIndex}
                    register={register}
                    errors={errors?.[subIndex]}
                    onRemove={remove}
                    control={control}
                />
            ))}
        </div>



    );
};
export default TaxComponents