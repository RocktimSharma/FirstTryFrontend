import {Card, CardContent} from "@components/extensions/card.tsx";
import {useFormContext} from "react-hook-form";
import {FormField} from "@components/forms/FormField.tsx";
import {type TaxFormValues} from "@features/taxes/types";
import {FormSwitch} from "@components/forms/FormSwitch.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {ExemptionFields} from "@features/taxes/forms/ExemptionFields.tsx";

const TaxCompliance = () => {
    const {register, control, formState: {errors}} = useFormContext<TaxFormValues>();
    return (
        <div>
            <p className={'mb-1 font-medium'}>Tax Compliance</p>
            <Card>
                <CardContent className={'space-y-3'}>
                    <FormSwitch
                        control={control}
                        name="compliance.is_reverse_charge"
                        label="Reverse Charge"
                        error={errors.compliance?.is_reverse_charge}
                    />
                    <FormSwitch
                        control={control}
                        name="compliance.is_exempt"
                        label="Tax Exempt"
                        error={errors.compliance?.is_exempt}
                    />


                    <ExemptionFields/>
                    <FormField label="HSN Sac Catgeory" error={errors.compliance?.hsn_sac_category}>
                        <ExtendedInput
                            placeholder="e.g. Value Added Tax"
                            {...register("compliance.hsn_sac_category",)}
                        />
                    </FormField>
                </CardContent>
            </Card>
        </div>
    );
};

export default TaxCompliance;