import { z } from "zod";
import {TaxAppliesToEnum, TaxComponentTypeEnum} from "@features/fms/taxes/types/enums.ts";
export const TaxRateComponentSchema = z.object({
    name: z.string().min(1).max(50),
    rate: z.coerce.number().min(0).max(100),
    component_type: TaxComponentTypeEnum.optional(),
    applies_to: TaxAppliesToEnum.default("ALL"),
});

export const TaxRateSchema = z.object({
    total_percentage: z.coerce.number().min(0).max(100),
    is_active: z.boolean().default(true),
    effective_from: z.string().or(z.date()), // PostGraphile accepts ISO strings
    effective_to: z.string().or(z.date()).optional().nullable(),
    // Nested components for the form
    components: z.array(TaxRateComponentSchema).optional(),
});