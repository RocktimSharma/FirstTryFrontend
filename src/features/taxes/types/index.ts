// 1. Export all individual schemas and enums for granular use
export * from "./enums"
export * from "./tax-core";
export * from "./tax-rates";
export * from "./tax-compliance";

// 2. Import them to create a "Master" Form Schema
import {z} from "zod";
import {TaxesSchema} from "@features/taxes/types/tax-core.ts";
import {TaxRateSchema} from "@features/taxes/types/tax-rates.ts";
import {TaxComplianceSchema} from "@features/taxes/types/tax-compliance.ts";

/**
 * Combined Schema for the "Create/Edit Tax" Form
 * This maps to the structure of your nested PostgreSQL tables
 */
export const TaxFormSchema = TaxesSchema.extend({
    // Relationship: One Tax has many Tax Rates
    rates: z.array(TaxRateSchema).min(1, "At least one tax rate is required"),

    // Relationship: One Tax has one Compliance record
    compliance: TaxComplianceSchema,
});
export type TaxFormValues = z.infer<typeof TaxFormSchema>;
