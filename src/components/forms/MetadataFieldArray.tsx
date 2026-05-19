
import { useFormContext, Controller } from "react-hook-form";
import { ExtendedInput } from "@components/extensions/input.tsx";
import { Plus, Trash2 } from "lucide-react";

type MetadataFieldArrayProps = {
    name?: string;
    title?: string | null;
    description?: string | null;
};

export const MetadataFieldArray = ({
                                       name = "metadata",
                                       title = "Metadata & Custom Fields",
                                       description = "Add custom key-value pairs for flexible filtering or reporting.",
                                   }: MetadataFieldArrayProps) => {
    // 1. Pull both control and formState errors from the context
    const { control, formState: { errors } } = useFormContext();

    // Safely look up errors for this specific field path (handles nested paths if any)
    const fieldError = errors[name];

    return (
        <div className="space-y-4 pt-4 border-t border-muted">
            {(title || description) && (
                <div>
                    {title && <h4 className="text-sm font-medium">{title}</h4>}
                    {description && <p className="text-xs text-muted-foreground">{description}</p>}
                </div>
            )}

            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    const currentMetadata = field.value || {};
                    const pairs = Object.entries(currentMetadata);

                    const handleAdd = () => {
                        let placeholderKey = "";
                        let counter = 1;
                        while (placeholderKey in currentMetadata) {
                            placeholderKey = `new_key_${counter}`;
                            counter++;
                        }
                        field.onChange({ ...currentMetadata, [placeholderKey]: "" });
                    };

                    const handleKeyChange = (oldKey: string, newKey: string) => {
                        const trimmedNewKey = newKey.trim();
                        // Prevent changing to an empty string or duplicate key names
                        if (oldKey === trimmedNewKey || !trimmedNewKey || trimmedNewKey in currentMetadata) return;

                        const updated = { ...currentMetadata };
                        const value = updated[oldKey];
                        delete updated[oldKey];
                        updated[trimmedNewKey] = value;
                        field.onChange(updated);
                    };

                    const handleValueChange = (key: string, newValue: string) => {
                        field.onChange({ ...currentMetadata, [key]: newValue });
                    };

                    const handleRemove = (keyToRemove: string) => {
                        const updated = { ...currentMetadata };
                        delete updated[keyToRemove];
                        field.onChange(updated);
                    };

                    return (
                        <div className="space-y-2">
                            {pairs.map(([key, value], index) => (
                                <div key={key || index} className="flex items-center gap-2">
                                    <ExtendedInput
                                        placeholder="Key (e.g., Project)"
                                        defaultValue={key}
                                        onBlur={(e) => handleKeyChange(key, e.target.value)}
                                        className="w-1/2"
                                    />
                                    <ExtendedInput
                                        placeholder="Value"
                                        value={value as string}
                                        onChange={(e) => handleValueChange(key, e.target.value)}
                                        className="w-1/2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(key)}
                                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                                        title="Remove field"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            <div className="flex flex-col gap-1 pt-1">
                                <button
                                    type="button"
                                    onClick={handleAdd}
                                    className="flex items-center gap-2 text-xs font-medium text-accent hover:underline w-fit"
                                >
                                    <Plus className="h-3 w-3" /> Add Custom Attributes
                                </button>

                                {/* 2. Render validation errors if Zod rejects anything in this record */}
                                {fieldError?.message && (
                                    <p className="text-xs font-medium text-destructive mt-1">
                                        {String(fieldError.message)}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                }}
            />
        </div>
    );
};