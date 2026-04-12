import {useFieldArray, useFormContext} from "react-hook-form";
import type {TaxFormValues} from "@features/taxes/types";
import {Button} from "@components/ui/button.tsx";
import {RateStatus, RateTotal} from "@features/taxes/forms/RateItem.tsx";
import React from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {Plus} from "lucide-react";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import TaxComponents from "@features/taxes/forms/TaxComponents.tsx";

const TODAY_STR = new Date().toISOString().split('T')[0];

const items = [
    {
        total_percentage: 15,
        is_active: true,
        effective_from: "2026-04-12T10:00:00Z",
        effective_to: null,
        components: [
            {name: "State Tax", rate: 7, component_type: "STANDARD", applies_to: "ALL"},
            {name: "Federal Tax", rate: 8, component_type: "STANDARD", applies_to: "ALL"}
        ]
    },
    {
        total_percentage: 5,
        is_active: true,
        effective_from: "2026-01-01T00:00:00Z",
        effective_to: "2026-12-31T23:59:59Z",
        components: [
            {name: "Service Fee", rate: 5, component_type: "SERVICE", applies_to: "ALL"}
        ]
    },
    {
        total_percentage: 20,
        is_active: false,
        effective_from: "2025-06-15T08:30:00Z",
        effective_to: null,
        components: [
            {name: "Luxury Tax", rate: 20, component_type: "SURCHARGE", applies_to: "ALL"}
        ]
    },
    {
        total_percentage: 10,
        is_active: true,
        effective_from: "2026-03-20T12:00:00Z",
        effective_to: null,
        components: [
            {name: "VAT", rate: 10, component_type: "VAT", applies_to: "ALL"}
        ]
    },
    {
        total_percentage: 0,
        is_active: true,
        effective_from: "2026-04-01T00:00:00Z",
        effective_to: null,
        components: [
            {name: "Exempt Rate", rate: 0, component_type: "EXEMPT", applies_to: "ALL"}
        ]
    }
];
const TaxRates = React.memo(() => {
    console.log("%c [Render] TaxRates Container", "color: #22d3ee; font-weight: bold");
    const {register, control, formState: {errors}} = useFormContext<TaxFormValues>();
    const {fields, append, remove} = useFieldArray({
        control,
        name: "rates",
    });

    // Stabilize the append function
    const handleAddRate = React.useCallback(() => {
        append({
            total_percentage: 0,
            is_active: true,
            effective_from: new Date().toISOString().split('T')[0],
            components: [] // Initialize components array to prevent undefined errors
        });
    }, [append]);

    return (
        <div>
            <div className={'flex items-center justify-between mb-4'}>
                <p className={'font-medium'}>Tax Rates</p>
                <Button
                    type="button"
                    variant="ghost"
                    className={'text-accent'}
                    size="sm"
                    onClick={() => append({
                        effective_from: TODAY_STR,
                        effective_to: '',
                        components: []
                    })}
                >
                    <Plus className="mr-1 h-3 w-3"/> Add New Rate
                </Button>
            </div>

            {/* Only show the Accordion if there are items in the fields array */}
            {fields.length > 0 ? (
                <Accordion
                    type="single"
                    collapsible
                    // Optional: Auto-open the newly added item
                    defaultValue={fields[fields.length - 1].id}
                    className={"rounded-sm border border-slate-200 shadow-none bg-card"}
                >
                    {fields.map((field, index) => {
                        const fieldName = `rates.${index}` as const;
                        const error = errors.rates?.[index];

                        return (
                            <AccordionItem
                                key={field.id}
                                value={field.id}
                                className="border-b px-4 last:border-b-0"
                            >
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3 flex-grow justify-between pr-4">
                                        <div className={'flex items-center gap-2'}>
                                            <RateTotal control={control} name={fieldName}/>
                                            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                                        v{index + 1}
                                    </span>
                                        </div>
                                        <RateStatus control={control} name={fieldName} today={TODAY_STR}/>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent>
                                    <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-2'}>
                                        <FormField label="Effective From" required error={error?.effective_from}>
                                            <ExtendedInput type="date" {...register(`${fieldName}.effective_from`)} />
                                        </FormField>
                                        <FormField label="Effective To" error={error?.effective_to}>
                                            <ExtendedInput type="date" {...register(`${fieldName}.effective_to`)} />
                                        </FormField>
                                    </div>
                                    <TaxComponents
                                        rateIndex={index}
                                        control={control}
                                        register={register}
                                        errors={error?.components}
                                    />

                                    {/* Optional: Add a remove button to delete specific versions */}
                                    <div className="flex justify-end mt-4">
                                        <Button
                                            variant="ghost"
                                            className="text-destructive text-xs"
                                            onClick={() => remove(index)}
                                        >
                                            Remove Version {index + 1}
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            ) : (
                /* Empty State */
                <div className="text-center py-8 border-2 border-dashed rounded-lg border-slate-200">
                    <p className="text-sm text-muted-foreground">No tax rates added yet.</p>
                </div>
            )}
        </div>
    );
});

export default TaxRates