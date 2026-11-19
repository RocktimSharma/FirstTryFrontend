import {cn} from "@/lib/utils";

interface OnboardingProgressBarProps {
    /** The current calculated percentage (0, 25, 50, 75, 100) */
    percentage: number;
}

export default function OnboardingProgressBar({percentage}: OnboardingProgressBarProps) {
    // Define our 4 core onboarding tracking benchmarks
    const steps = [
        {id: 1, threshold: 25, label: "Company"},
        {id: 2, threshold: 50, label: "Profile"},
        {id: 3, threshold: 75, label: "Operations"},
        {id: 4, threshold: 100, label: "Collaborators"},
    ];

    return (
        <div className="w-full space-y-2">
            {/* Segmented Progress Track Row */}
            <div className="flex w-full items-center gap-2">
                {steps.map((step, index) => {
                    // Determine state of this specific track segment
                    const isCompleted = percentage >= step.threshold;
                    const isActive = percentage < step.threshold && (index === 0 || percentage >= steps[index - 1].threshold);

                    return (
                        <div
                            key={step.id}
                            className="relative h-2 flex-1"
                        >
                            {/* Background Track Segment */}
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-full transition-all duration-500 ease-in-out",
                                    isCompleted
                                        ? "bg-slate-900" // Completed state color
                                        : isActive
                                            ? "bg-slate-200" // Active uncompleted step block
                                            : "bg-slate-100" // Untouched future steps
                                )}
                            />

                            {/* Sliding Active Overlay for the currently active segment block */}
                            {isActive && (
                                <div
                                    className="absolute bottom-0 left-0 top-0 rounded-full bg-slate-900 transition-all duration-500 ease-in-out"
                                    style={{
                                        // Fill individual block dynamically based on the specific phase window
                                        width: `${((percentage - (index > 0 ? steps[index - 1].threshold : 0)) / 25) * 100}%`
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Optional Metadata: Percentage String indicators */}
            <div className="flex justify-between px-1 text-xs font-medium text-slate-400">
                <span>Setup Progression</span>
                <span className="text-slate-700 tabular-nums">{percentage}% Complete</span>
            </div>
        </div>
    );
}