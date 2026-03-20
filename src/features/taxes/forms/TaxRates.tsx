
import {useFieldArray, useFormContext, useWatch} from "react-hook-form";
import type {TaxFormValues} from "@features/taxes/types";
import {Card, CardHeader, CardContent, CardTitle} from "@components/extensions/card.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Button} from "@components/ui/button.tsx";
import {Plus, Trash, Trash2} from "lucide-react";
import TaxComponents from "@features/taxes/forms/TaxComponents.tsx";
import {cn} from "@lib/utils.ts";
import RateItem from "@features/taxes/forms/RateItem.tsx";

const TaxRates = () => {
    const {register,control, formState: {errors}} = useFormContext<TaxFormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "rates",
    });
    const today = new Date().toISOString().split('T')[0];
    return (
        <div>
            <p className={'mb-1 font-medium'}>Tax Rates & Components</p>
            <Card>
                <CardHeader className={"flex justify-between items-center"}>
                    <p className={'mb-1 font-medium'}>Tax Rates</p>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => append({
                            total_percentage: 0,
                            is_active: true,
                            effective_from: new Date().toISOString().split('T')[0]
                        })}
                        className={"text-accent"}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Rate
                    </Button>
                </CardHeader>
                <CardContent>
                    {fields.map((field, index) => (
                        <RateItem
                            key={field.id} // Important: use field.id, not index
                            index={index}

                            control={control}
                            register={register}
                            errors={errors}
                            today={today}
                            onRemove={remove}
                            isOnlyItem={fields.length === 1}
                        />
                    ))}


                </CardContent>
            </Card>


        </div>
    );
};

export default TaxRates;