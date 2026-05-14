
import {FormField} from "@components/forms/FormField.tsx";
import {Controller, useFormContext} from "react-hook-form";
import {Select, SelectContent, SelectValue} from "@components/ui/select.tsx";
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import {type TaxFormValues, TaxNatureEnum} from "@features/fms/taxes/types";
import {CardContent, Card} from "@components/extensions/card.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {ColorPickerField} from "@components/forms/ColorPicker.tsx";

const TaxBasicInfo = () => {
    const {register, control, formState: {errors}} = useFormContext<TaxFormValues>();
    return (
        <div>
            <p className={'mb-1 font-medium'}>Basic Information</p>
            <Card>
                <CardContent className={'space-y-3'}>
                    <FormField label="Tax Name" required={true} error={errors.name}>
                        <ExtendedInput
                            placeholder="e.g. Value Added Tax"
                            {...register("name", {required: "Tax name is required"})}
                        />
                    </FormField>
                    <FormField label="Label on Invoice" error={errors.label_on_invoice}>
                        <ExtendedInput
                            placeholder="e.g. VAT (15%)"
                            {...register("label_on_invoice")}
                        />
                    </FormField>
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                        <FormField label="Tax Code" required error={errors.code}>
                            <ExtendedInput
                                placeholder="e.g. VAT-001"
                                {...register("code", {required: "Tax code is required"})}
                            />
                        </FormField>

                        <FormField label="Tax Nature" required={true} error={errors.nature}>
                            <Controller
                                control={control}
                                name="nature" // Must match your schema key
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <ExtendedSelectTrigger>
                                            <SelectValue placeholder="Select tax nature"/>
                                        </ExtendedSelectTrigger>
                                        <SelectContent>
                                            {/* You can map through your Enum values here */}
                                            {TaxNatureEnum.options.map((option) => (
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
                    <FormField label="Color" error={errors.color_code}>
                        <ColorPickerField name='color_code'></ColorPickerField>
                    </FormField>
                </CardContent>

            </Card>

        </div>
    );
};

export default TaxBasicInfo;