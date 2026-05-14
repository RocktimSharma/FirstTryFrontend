import {Controller, useFormContext} from "react-hook-form";
import {RoundOffMethodEnum, TaxBaseEnum, TaxCalcTypeEnum, type TaxFormValues} from "@features/fms/taxes/types";
import {CardContent, Card} from "@components/extensions/card.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {Select, SelectContent, SelectValue} from "@components/ui/select.tsx";
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import {Switch} from "@components/ui/switch.tsx";
import {cn} from "@lib/utils.ts";
import {ExtendedInput} from "@components/extensions/input.tsx";

// TODO: Need to toggle min threshold and base price based on calculation type
const TaxCalculationSettings = () => {
    const {register,control, formState: {errors}} = useFormContext<TaxFormValues>();
    return (
        <div>
            <p className={'mb-1 font-medium'}>Calculation Settings</p>
            <Card>
                <CardContent className={'space-y-3'}>
                    <FormField label="Calculation Type" required error={errors.calculation_type}>
                        <Controller
                            control={control}
                            name="calculation_type" // Must match your schema key
                            render={({field}) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <ExtendedSelectTrigger>
                                        <SelectValue placeholder="Select calculation type"/>
                                    </ExtendedSelectTrigger>
                                    <SelectContent>
                                        {/* You can map through your Enum values here */}
                                        {TaxCalcTypeEnum.options.map((option) => (
                                            <ExtendedSelectItem key={option} value={option}>
                                                {option.replace("_", " ")}
                                            </ExtendedSelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FormField>

                    <FormField label="Base Price Type" required error={errors.base_price_type}>
                        <Controller
                            control={control}
                            name="base_price_type" // Must match your schema key
                            render={({field}) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <ExtendedSelectTrigger>
                                        <SelectValue placeholder="Select base price type"/>
                                    </ExtendedSelectTrigger>
                                    <SelectContent>
                                        {/* You can map through your Enum values here */}
                                        {TaxBaseEnum.options.map((option) => (
                                            <ExtendedSelectItem key={option} value={option}>
                                                {option.replace("_", " ")}
                                            </ExtendedSelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FormField>
                    <FormField label="Min. Threshold Amt."  error={errors.min_threshold_amount}>
                        <ExtendedInput
                            placeholder="e.g. 1200.78"
                            {...register("min_threshold_amount")}
                        />
                    </FormField>
                    <FormField label="Round off Method" required error={errors.round_off_method}>

                        <Controller
                            control={control}
                            name="round_off_method" // Must match your schema key
                            render={({field}) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <ExtendedSelectTrigger>
                                        <SelectValue placeholder="Select round off method"/>
                                    </ExtendedSelectTrigger>
                                    <SelectContent>
                                        {/* You can map through your Enum values here */}
                                        {RoundOffMethodEnum.options.map((option) => (
                                            <ExtendedSelectItem key={option} value={option}>
                                                {option.replace("_", " ")}
                                            </ExtendedSelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FormField>
                    <div className='grid sm:grid-cols-2 gap-4'>
                        <FormField label="Is Inclusive?" error={errors.inclusive_tax}
                                   className={'flex-row justify-between items-center'}>
                            <Controller
                                control={control}
                                name="inclusive_tax"
                                render={({field}) => (
                                    <Switch

                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className={cn(
                                            // Ensure the "off" state has a border so it's visible on white
                                            "data-[state=unchecked]:bg-border data-[state=unchecked]:border-border border",
                                            // You can also change the "thumb" (the circle) color if needed
                                            "[&>span]:bg-input"
                                        )}
                                    />
                                )}
                            />
                        </FormField>
                        <FormField label="Apply After Discount?" error={errors.apply_after_discount}
                                   className={'flex-row justify-between items-center'}>
                            <Controller
                                control={control}
                                name="apply_after_discount"
                                render={({field}) => (
                                    <Switch

                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className={cn(
                                            // Ensure the "off" state has a border so it's visible on white
                                            "data-[state=unchecked]:bg-border data-[state=unchecked]:border-border border",
                                            // You can also change the "thumb" (the circle) color if needed
                                            "[&>span]:bg-input"
                                        )}
                                    />
                                )}
                            />
                        </FormField>

                    </div>

                </CardContent>

            </Card>
        </div>
    );
};

export default TaxCalculationSettings;