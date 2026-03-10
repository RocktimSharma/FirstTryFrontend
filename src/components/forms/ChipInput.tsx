import { useState } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ChipInput() {
    const [selected, setSelected] = useState("M")
    const sizes = ["M", "L", "XL", "XXL"]

    return (
        <div
            tabIndex={0}
            className={cn(
                "flex flex-1 items-center justify-between gap-2 h-10 px-3 py-1",
                "rounded-sm border bg-background",
                "focus-within:ring-1 focus-within:ring-ring focus-within:border-ring"
            )}
        >
            <Label className="text-sm text-muted-foreground">Size</Label>

            <div className="flex gap-2">
                {sizes.map((size) => (
                    <button
                        key={size}
                        type="button"
                        onClick={() => setSelected(size)}
                        className={cn(
                            "h-7 px-3 rounded-full text-xs transition",
                            "border",
                            selected === size
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted text-foreground hover:bg-muted/70"
                        )}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    )
}
