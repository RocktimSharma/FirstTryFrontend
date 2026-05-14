import {useWatch} from "react-hook-form";
import {Card, CardContent, CardHeader} from "@components/extensions/card.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Button} from "@components/ui/button.tsx";
import {Trash2} from "lucide-react";
import TaxComponents from "@features/fms/taxes/forms/TaxComponents.tsx";
import {cn, formatDate} from "@lib/utils.ts";
import { memo } from "react";

export const RateStatus = ({ control, name, today }: any) => {
    const from = useWatch({ control, name: `${name}.effective_from` });
    const to = useWatch({ control, name: `${name}.effective_to` });

    // 1. Ensure 'today' is a timestamp for safe comparison
    const todayTime = new Date(today).getTime();

    let statusLabel = "Active";
    let statusColor = "bg-green-500/10 text-green-600 border-green-200";

    // 2. Use .getTime() to compare numbers instead of objects
    if (from && new Date(from).getTime() > todayTime) {
        statusLabel = "Scheduled";
        statusColor = "bg-blue-500/10 text-blue-600 border-blue-200";
    } else if (to && new Date(to).getTime() < todayTime) {
        statusLabel = "Expired";
        statusColor = "bg-muted text-muted-foreground border-slate-200";
    }

    return (
        <div className="flex items-center gap-3 flex-grow justify-between">
            <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", statusColor)}>
                {statusLabel}
            </div>
            <div className="hidden md:flex items-center gap-2">
                <p>{formatDate(from) || '---'}</p>
                <span className="opacity-50">→</span>
                <p>{formatDate(to) || 'Present'}</p>
            </div>
        </div>
    );
};

export const RateTotal = ({ control, name }: any) => {
    // Only watch the specific components for THIS rate
    const components = useWatch({ control, name: `${name}.components` }) || [];
    const total = components.reduce((acc: number, curr: any) => acc + (Number(curr.percentage) || 0), 0);
    return <span className="text-2xl md:text-3xl font-bold text-accent">{total}%</span>;
};

const RateItem = memo(({ index, control, register, errors, today, onRemove, isOnlyItem }: any) => {
    const fieldName = `rates.${index}` as const;
    return (
        <Card className="bg-muted/20 mb-4">
            <CardHeader className="flex flex-row items-center px-2 justify-between mb-2 border-b">
                <div className="flex items-center gap-3">
                    <RateTotal control={control} name={fieldName} />
                    <RateStatus control={control} name={fieldName} today={today} />
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        v{index + 1}
                    </span>
                </div>
                {!isOnlyItem && (
                    <Button variant="ghost" size="icon" onClick={() => onRemove(index)} className="text-destructive">
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                )}
            </CardHeader>
            <CardContent className="px-2 sm:px-4">
                <div className={'grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4'}>
                    <FormField label="Effective From" required error={errors?.effective_from}>
                        <ExtendedInput type="date" {...register(`${fieldName}.effective_from`)} />
                    </FormField>
                    <FormField label="Effective To" error={errors?.effective_to}>
                        <ExtendedInput type="date" {...register(`${fieldName}.effective_to`)} />
                    </FormField>
                </div>
                <TaxComponents rateIndex={index} control={control} register={register} errors={errors?.components}

                />
            </CardContent>
        </Card>
    );
}, (prev, next) => {
    // 1. Check if structural props changed
    const basicPropsMatch =
        prev.index === next.index &&
        prev.isOnlyItem === next.isOnlyItem &&
        prev.today === next.today; // Don't forget today's date if it changes!

    // 2. Check if the error reference for THIS specific rate changed
    // RHF updates these references immutably, so if the error is the same,
    // the reference will be identical.
    const errorsMatch = prev.errors?.rates?.[prev.index] === next.errors?.rates?.[next.index];

    return basicPropsMatch && errorsMatch;
});

export default RateItem