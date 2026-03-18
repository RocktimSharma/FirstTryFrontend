import {Controller, useFormContext} from "react-hook-form";
import {cn} from "@lib/utils.ts";
import {Pencil} from "lucide-react";

interface ColorPickerProps {
    name: string;
    label?: string;
    presets?: string[];
}

const DEFAULT_PRESETS = [
    "#000000", "#ffffff", "#ef4444", "#f97316",
    "#f59e0b", "#10b981", "#3b82f6", "#6366f1", "#8b5cf6"
];
// TODO: Need to fix the ui
export function ColorPickerField({ name, presets = DEFAULT_PRESETS }: ColorPickerProps) {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                /* flex-wrap allows the presets to move below the picker on tiny screens */
                <div className="flex flex-wrap items-center gap-3  w-fit">

                    {/* Main Picker Group */}
                    <div className="flex items-center gap-3">
                        <label
                            className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/20 shadow-md transition-all hover:scale-105 active:scale-95"
                            style={{ backgroundColor: field.value || "#000000" }}
                        >
                            <input
                                type="color"
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                value={field.value || "#000000"}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm group-hover:bg-white/40">
                                <Pencil className="h-3.5 w-3.5 text-white drop-shadow-md" />
                            </div>
                        </label>

                        {/* Vertical Divider - Hidden when wrapped on very small screens if you prefer */}
                        <div className="h-8 w-[1px] bg-border/60" />
                    </div>

                    {/* Presets Row - flex-wrap ensures these don't overflow the screen */}
                    <div className="flex flex-wrap items-center gap-2 max-w-[280px] sm:max-w-none">
                        {presets.map((color) => (
                            <button
                                key={color}
                                type="button"
                                className={cn(
                                    "h-7 w-7 rounded-full border border-black/10 transition-all hover:scale-110 active:scale-90",
                                    field.value === color
                                        ? "ring-2 ring-primary ring-offset-2 scale-110 z-10"
                                        : "hover:ring-2 hover:ring-border/50"
                                )}
                                style={{ backgroundColor: color }}
                                onClick={() => setValue(name, color)}
                                title={color}
                            />
                        ))}
                    </div>
                </div>
            )}
        />
    );
}