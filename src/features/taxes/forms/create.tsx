import {Controller, FormProvider, useFieldArray, useForm} from "react-hook-form";
import {
    RoundOffMethodEnum,
    TaxBaseEnum,
    TaxCalcTypeEnum,
    TaxFormSchema,
    type TaxFormValues,
    TaxNatureEnum
} from "@features/taxes/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardContent, ExtendedCard} from "@components/extensions/card.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Select, SelectContent, SelectValue} from "@components/ui/select.tsx";
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import {Switch} from "@components/ui/switch.tsx";
import {cn} from "@lib/utils.ts";
import TaxBasicInfo from "@features/taxes/forms/TaxBasicInfo.tsx";
import TaxCalculationSettings from "@features/taxes/forms/TaxCalculationSettings.tsx";
import TaxRates from "@features/taxes/forms/TaxRates.tsx";

const CreateTaxForm = () => {
    const methods = useForm<TaxFormValues>({
        resolver: zodResolver(TaxFormSchema),
        defaultValues: {
            // Core Fields
            name: "",
            code: "",
            label_on_invoice: "",

            // Enum Fields (Must match your Zod Enums exactly)
            calculation_type: "PERCENTAGE",
            nature: "VALUE_ADDED",
            base_price_type: "NET_PRICE",
            round_off_method: "NEAREST",

            // Boolean/Numeric Fields
            inclusive_tax: false,
            apply_after_discount: true,
            min_threshold_amount: 0,
            is_system_defined: false,
            color_code: "#CCCCCC",

            // Required IDs (If your schema says .uuid(), provide empty or handle)
            created_by: "00000000-0000-0000-0000-000000000000",

            // Nested Arrays/Objects
            rates: [{
                total_percentage: 0,
                is_active: true,
                effective_from: new Date()
            }],
            compliance: {
                is_reverse_charge: false,
                is_exempt: false,
                hsn_sac_category: ""
            }
        },
    });

    const {register, control, handleSubmit, formState: {errors}} = methods;

    // Handles the dynamic "tax_rates" array
    const {fields, append, remove} = useFieldArray({
        control,
        name: "rates",
    });

    const onSubmit = (data: TaxFormValues) => {
        console.log("Submit to PostGraphile:", data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}
                  className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 space-4 gap-4">
                <TaxBasicInfo/>
                <TaxCalculationSettings/>
                </div>
                <TaxRates/>

                {/*<div>*/}


                {/*/!* --- Core Tax Fields --- *!/*/}
                {/*<div>*/}
                {/*    <label>Tax Name</label>*/}
                {/*    <input {...register("name")} className="border p-2" />*/}
                {/*    {errors.name && <p className="text-red-500">{errors.name.message}</p>}*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <label>Tax Code</label>*/}
                {/*    <input {...register("code")} className="border p-2" />*/}
                {/*    {errors.code && <p className="text-red-500">{errors.code.message}</p>}*/}
                {/*</div>*/}

                {/*<hr />*/}

                {/*/!* --- Dynamic Tax Rates Section --- *!/*/}
                {/*<h3>Tax Rates</h3>*/}
                {/*{fields.map((field, index) => (*/}
                {/*    <div key={field.id} className="border p-4 mb-2">*/}
                {/*        <div>*/}
                {/*            <label>Percentage</label>*/}
                {/*            <input*/}
                {/*                type="number"*/}
                {/*                {...register(`rates.${index}.total_percentage` as const)}*/}
                {/*                className="border p-1"*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*        <button type="button" onClick={() => remove(index)} className="text-sm text-red-500">*/}
                {/*            Remove Rate*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*))}*/}

                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={() => append({ total_percentage: 0, is_active: true, effective_from: new Date() })}*/}
                {/*    className="bg-blue-500 text-white px-4 py-2"*/}
                {/*>*/}
                {/*    Add Rate*/}
                {/*</button>*/}

                {/*<hr />*/}

                {/*/!* --- Compliance Section --- *!/*/}
                {/*<div>*/}
                {/*    <label>*/}
                {/*        <input type="checkbox" {...register("compliance.is_reverse_charge")} />*/}
                {/*        Reverse Charge?*/}
                {/*    </label>*/}
                {/*</div>*/}

                {/*<button type="submit" className="bg-green-600 text-white px-6 py-2">*/}
                {/*    Save Tax Configuration*/}
                {/*</button>*/}
                {/*</div>*/}
            </form>
        </FormProvider>
    );
};

export default CreateTaxForm;