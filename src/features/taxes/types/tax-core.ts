import {z} from "zod";
import {RoundOffMethodEnum, TaxBaseEnum, TaxCalcTypeEnum, TaxNatureEnum} from "@features/taxes/types/enums.ts";

export const TaxesSchema = z.object({
    id: z.uuid().optional(), // Optional if creating new
    name: z.string().min(1).max(100),
    label_on_invoice: z.string().max(50).optional().nullable(),
    code: z.string().min(1).max(20),
    nature: TaxNatureEnum.default("VALUE_ADDED"),
    calculation_type: TaxCalcTypeEnum.default("PERCENTAGE"),
    base_price_type: TaxBaseEnum.default("NET_PRICE"),
    inclusive_tax: z.boolean().default(false),
    apply_after_discount: z.boolean().default(true),
    round_off_method: RoundOffMethodEnum.default("NEAREST"),
    min_threshold_amount: z.coerce.number().default(0.00),
    output_tax_ledger_id: z.uuid().optional().nullable(),
    input_tax_ledger_id: z.uuid().optional().nullable(),
    tax_payable_account_id: z.uuid().optional().nullable(),
    created_by: z.uuid(),
    is_system_defined: z.boolean().default(false),
    color_code: z.string().regex(/^#[0-9A-F]{6}$/i).default("#CCCCCC"),
    metadata: z.record(z.string(), z.any()).optional().nullable(),
});