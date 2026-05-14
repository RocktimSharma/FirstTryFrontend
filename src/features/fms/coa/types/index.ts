import {z} from "zod";

export const AccountTypeEnum = z.enum([
    "ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"
]);

export const ChartOfAccountSchema = z.object({
    name: z.string().min(3).max(100),
    code: z.string().min(3).max(20), // e.g., "1001-001"
    account_type: AccountTypeEnum,
    parent_id: z.uuid().nullable().optional(), // For hierarchy
    is_group: z.boolean().default(false), // If true, it's a folder (can't post transactions directly)
    is_system_defined: z.boolean().default(false),
    description: z.string().max(255).optional(),

// Dynamic Metadata (Flexible)
    // This allows any key-value pair based on business needs
    metadata: z.record(z.string(), z.unknown()).optional().default({}),

    // Tags for filtering (Agencies might tag by 'Project', Factories by 'Line')
    tags: z.array(z.string()).optional(),
});

export type ChartOfAccount = z.infer<typeof ChartOfAccountSchema>;