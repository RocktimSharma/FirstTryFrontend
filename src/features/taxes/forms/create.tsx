import {FormProvider, useForm} from "react-hook-form";
import {TaxFormSchema, type TaxFormValues} from "@features/taxes/types";
import {zodResolver} from "@hookform/resolvers/zod";
import TaxBasicInfo from "@features/taxes/forms/TaxBasicInfo.tsx";
import TaxCalculationSettings from "@features/taxes/forms/TaxCalculationSettings.tsx";
import TaxRates from "@features/taxes/forms/TaxRates.tsx";
import TaxCompliance from "@features/taxes/forms/TaxCompliance.tsx";
import Accounting from "@features/taxes/forms/Accounting.tsx";

const DEFAULT_TAX_VALUES: TaxFormValues ={
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
}

const CreateTaxForm = () => {
    console.log("%c >>> [RENDER] ROOT FORM <<<", "background: #222; color: #bada55; font-size: 12px; font-weight: bold");
    const methods = useForm<TaxFormValues>({
        resolver: zodResolver(TaxFormSchema),
        defaultValues: DEFAULT_TAX_VALUES,
    });

    const {handleSubmit} = methods;


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
                <div className="grid grid-cols-1 md:grid-cols-2 space-4 gap-4">
                 <TaxCompliance/>
                <Accounting/>
                </div>
                <TaxRates/>


                {/*<DevTool control={methods.control}/>*/}
            </form>
        </FormProvider>
    );
};

export default CreateTaxForm;