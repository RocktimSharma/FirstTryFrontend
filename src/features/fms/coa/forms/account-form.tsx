import React from 'react';
import {Controller, FormProvider, useForm} from "react-hook-form";
import {TaxCalcTypeEnum, TaxFormSchema, type TaxFormValues} from "@features/fms/taxes/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {AccountTypeEnum, type ChartOfAccount, ChartOfAccountSchema} from "@features/fms/coa/types";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Select, SelectContent, SelectValue} from "@components/ui/select.tsx";
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import {ExtendedTextarea} from "@components/extensions/textarea.tsx";
import {FormSwitch} from "@components/forms/FormSwitch.tsx";
import {MetadataFieldArray} from "@components/forms/MetadataFieldArray.tsx";

type AccountFormProps = {
    parentAccounts: any[];
};

const AccountForm = ({ parentAccounts }: AccountFormProps) => {
    const methods = useForm<ChartOfAccount>({
        resolver: zodResolver(ChartOfAccountSchema),
    });

    const {register,control,handleSubmit, formState: {errors}} = methods;


    const onSubmit = (data: TaxFormValues) => {
        console.log("Submit to PostGraphile:", data);
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}
                  className="space-y-4">
                <FormField
                    label="Account Name"
                    required={true}
                    error={errors.name}
                >
                    <ExtendedInput
                        placeholder="e.g. Cash Account"
                        {...register("name", {
                            required: "Account name is required",
                        })}
                    />
                </FormField>

                <FormField
                    label="Account Code"
                    required={true}
                    error={errors.code}
                >
                    <ExtendedInput
                        placeholder="e.g. ACC-001"
                        {...register("code", {
                            required: "Account code is required",
                        })}
                    />
                </FormField>

                <FormField label="Account Type" required error={errors.account_type}>
                    <Controller
                        control={control}
                        name="account_type" // Must match your schema key
                        render={({field}) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                            >
                                <ExtendedSelectTrigger>
                                    <SelectValue placeholder="Select account type"/>
                                </ExtendedSelectTrigger>
                                <SelectContent>
                                    {/* You can map through your Enum values here */}
                                    {AccountTypeEnum.options.map((option) => (
                                        <ExtendedSelectItem key={option} value={option}>
                                            {option.replace("_", " ")}
                                        </ExtendedSelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </FormField>
                <FormField
                    label="Parent Account"
                    required={false}
                    error={errors.parent_id}
                >
                    <Controller
                        control={control}
                        name="parent_id"
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <ExtendedSelectTrigger>
                                    <SelectValue placeholder="Select parent account" />
                                </ExtendedSelectTrigger>

                                <SelectContent>
                                    <ExtendedSelectItem value="root">
                                        None (Top Level Account)
                                    </ExtendedSelectItem>

                                    {parentAccounts.map((account) => (
                                        <ExtendedSelectItem
                                            key={account.id}
                                            value={account.id}
                                        >
                                            {account.code} - {account.name}
                                        </ExtendedSelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </FormField>
                <FormSwitch
                    control={control}
                    name="is_group"
                    label="Is Group"
                    error={errors.is_group}
                />
                <FormField
                    label="Descriptions"
                    required={false}
                    error={errors.description}
                >
                    <ExtendedTextarea
                        placeholder="e.g. Account used to record VAT-related transactions"
                        {...register("description")}
                    />
                </FormField>



                <MetadataFieldArray
                    name={'metadata'}
                    title="Custom Attributes"
                    description="Add extra parameters to this account layer."
                />

            </form>
        </FormProvider>
    );
};

export default AccountForm;