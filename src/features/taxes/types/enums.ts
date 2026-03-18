import { z } from "zod";

export const TaxCalcTypeEnum = z.enum(["PERCENTAGE", "FIX_AMOUNT", "SLAB_BASED"]);
export const TaxNatureEnum = z.enum(["VALUE_ADDED", "SALES_TAX", "EXCISE", "CESS", "SERVICE_TAX", "CUSTOMS_DUTY"]);
export const TaxBaseEnum = z.enum(["NET_PRICE", "GROSS_PRICE", "MRP"]);
export const TaxComponentTypeEnum = z.enum(["CENTRAL", "STATE", "LOCAL", "INTEGRATED"]);
export const TaxAppliesToEnum = z.enum(["INTRA_STATE", "INTER_STATE", "ALL"]);
export const TaxExemptionTypeEnum = z.enum(["EXEMPT", "NIL_RATED", "ZERO_RATED", "OUT_OF_SCOPE"]);
export const RoundOffMethodEnum = z.enum(["UP", "DOWN", "NEAREST", "NONE"]);