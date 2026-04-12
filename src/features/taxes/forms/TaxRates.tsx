import {useFieldArray, useFormContext} from "react-hook-form";
import type {TaxFormValues} from "@features/taxes/types";
import {Button} from "@components/ui/button.tsx";
import RateItem, {RateStatus, RateTotal} from "@features/taxes/forms/RateItem.tsx";
import React from "react";
import {Card, CardContent} from "@components/extensions/card.tsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Trash2} from "lucide-react";
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
            { name: "State Tax", rate: 7, component_type: "STANDARD", applies_to: "ALL" },
            { name: "Federal Tax", rate: 8, component_type: "STANDARD", applies_to: "ALL" }
        ]
    },
    {
        total_percentage: 5,
        is_active: true,
        effective_from: "2026-01-01T00:00:00Z",
        effective_to: "2026-12-31T23:59:59Z",
        components: [
            { name: "Service Fee", rate: 5, component_type: "SERVICE", applies_to: "ALL" }
        ]
    },
    {
        total_percentage: 20,
        is_active: false,
        effective_from: "2025-06-15T08:30:00Z",
        effective_to: null,
        components: [
            { name: "Luxury Tax", rate: 20, component_type: "SURCHARGE", applies_to: "ALL" }
        ]
    },
    {
        total_percentage: 10,
        is_active: true,
        effective_from: "2026-03-20T12:00:00Z",
        effective_to: null,
        components: [
            { name: "VAT", rate: 10, component_type: "VAT", applies_to: "ALL" }
        ]
    },
    {
        total_percentage: 0,
        is_active: true,
        effective_from: "2026-04-01T00:00:00Z",
        effective_to: null,
        components: [
            { name: "Exempt Rate", rate: 0, component_type: "EXEMPT", applies_to: "ALL" }
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

            <p className={'mb-1 font-medium'}>Tax Rates</p>


                    <Accordion type="single" collapsible defaultValue="plans" className={"rounded-sm gap-2 border-none shadow-none drop-shadow-xs  bg-card"}>

                        {fields.map((field, index) => {
                                const fieldName = `rates.${index}` as const;
                                const error=errors.rates?.[index]
                                return (
                                <AccordionItem
                                    key={field.id}
                                    value={field.id}
                                    className="border-b px-4 last:border-b-0"
                                >
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-3 flex-grow justify-between">
                                            <div className={'flex items-center gap-2'}>
                                                <RateTotal control={control} name={fieldName} />
                                                                        <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        v{index + 1}
                    </span>
                                            </div>


                                            <RateStatus control={control} name={fieldName} today={TODAY_STR} />

                                        </div>

                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className={'grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4'}>
                                            <FormField label="Effective From" required error={error?.effective_from}>
                                                <ExtendedInput type="date" {...register(`${fieldName}.effective_from`)} />
                                            </FormField>
                                            <FormField label="Effective To" error={error?.effective_to}>
                                                <ExtendedInput type="date" {...register(`${fieldName}.effective_to`)} />
                                            </FormField>
                                        </div>
                                        <TaxComponents rateIndex={index} control={control} register={register} errors={error?.components}></TaxComponents>

                                    </AccordionContent>
                                </AccordionItem>)
                            }
                            // <RateItem
                            //     key={field.id} // This is crucial for performance!
                            //     index={index}
                            //     control={control}
                            //     register={register}
                            //     error={errors.rates?.[index]}
                            //     today={TODAY_STR}
                            //     onRemove={remove}
                            //     isOnlyItem={fields.length === 1}
                            // />
                        )}


                    {/*    {items.map((item) => (*/}
                    {/*        <AccordionItem key={item.total_percentage} value={item.total_percentage}>*/}
                    {/*            <AccordionTrigger>*/}

                    {/*                <div className="flex items-center gap-3">*/}
                    {/*                    <RateTotal control={control} name={fieldName} />*/}
                    {/*                    <RateStatus control={control} name={fieldName} today={today} />*/}
                    {/*                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">*/}
                    {/*    v{index + 1}*/}
                    {/*</span>*/}
                    {/*                </div>*/}
                    {/*       */}

                    {/*            </AccordionTrigger>*/}
                    {/*            <AccordionContent>{item.total_percentage}</AccordionContent>*/}
                    {/*        </AccordionItem>*/}
                    {/*    ))}*/}
                    </Accordion>



            {/* ... */}
            <Button type="button" onClick={handleAddRate}>
                Add Rate
            </Button>

            {/*{fields.map((field, index) => (*/}
            {/*    <RateItem*/}
            {/*        key={field.id} // This is crucial for performance!*/}
            {/*        index={index}*/}
            {/*        control={control}*/}
            {/*        register={register}*/}
            {/*        error={errors.rates?.[index]}*/}
            {/*        today={TODAY_STR}*/}
            {/*        onRemove={remove}*/}
            {/*        isOnlyItem={fields.length === 1}*/}
            {/*    />*/}
            {/*))}*/}
        </div>
    );
});

export default TaxRates