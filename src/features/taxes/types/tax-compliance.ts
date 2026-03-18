import { z } from "zod";
import {TaxExemptionTypeEnum} from "@features/taxes/types/enums.ts";
export const TaxComplianceSchema = z.object({
    is_reverse_charge: z.boolean().default(false),
    is_exempt: z.boolean().default(false),
    exemption_type: TaxExemptionTypeEnum.optional().nullable(),
    exemption_reason: z.string().optional().nullable(),
    hsn_sac_category: z.string().max(100).optional().nullable(),
});