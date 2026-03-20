import {useWatch} from "react-hook-form";
import {Card, CardContent, CardHeader} from "@components/extensions/card.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Button} from "@components/ui/button.tsx";
import {Trash2} from "lucide-react";
import TaxComponents from "@features/taxes/forms/TaxComponents.tsx";
import {cn} from "@lib/utils.ts";

// 1. Create a sub-component for the individual Rate card
const RateItem = ({index, control, register, errors, today, onRemove, isOnlyItem}: any) => {
    // Hooks are now called at the TOP LEVEL of this sub-component
    const from = useWatch({control, name: `rates.${index}.effective_from`});
    const to = useWatch({control, name: `rates.${index}.effective_to`});
    const components = useWatch({control, name: `rates.${index}.components`}) || [];

    const total = components.reduce((acc: number, curr: any) => acc + (Number(curr.percentage) || 0), 0);

    let statusLabel = "Active";
    let statusColor = "bg-green-500/10 text-green-600 border-green-200";

    if (from && from > today) {
        statusLabel = "Scheduled";
        statusColor = "bg-blue-500/10 text-blue-600 border-blue-200";
    } else if (to && to < today) {
        statusLabel = "Expired";
        statusColor = "bg-muted text-muted-foreground border-slate-200";
    }

    return (
        <Card className="bg-muted/10 mb-4">
            <CardHeader className="flex flex-row items-center px-2 sm:px-4 md:px-6 justify-between mb-2 border-b">
                <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-bold text-accent">{total}%</span>
                    <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", statusColor)}>
                        {statusLabel}
                    </div>
                    <span
                        className="text-xs font-medium text-accent bg-accent/10 border-accent px-2 py-0.5 rounded-full">
                        v{index + 1}
                    </span>
                </div>
                {!isOnlyItem && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(index)}
                        className="text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                )}
            </CardHeader>
            <CardContent className={"px-2 sm:px-4 md:px-6"}>
                <div className={'grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4'}>
                    <FormField label="Effective From" required error={errors.rates?.[index]?.effective_from}>
                        <ExtendedInput
                            type="date"
                            className={"bg-card"}
                            {...register(`rates.${index}.effective_from` as const)}
                        />
                    </FormField>
                    <FormField label="Effective To" error={errors.rates?.[index]?.effective_to}>
                        <ExtendedInput
                            type="date"
                            className={"bg-card"}
                            {...register(`rates.${index}.effective_to` as const)}
                        />
                    </FormField>
                </div>
                <TaxComponents
                    rateIndex={index}
                    control={control}
                    register={register}
                    errors={errors}
                />
            </CardContent>
        </Card>
    );
};

export default RateItem