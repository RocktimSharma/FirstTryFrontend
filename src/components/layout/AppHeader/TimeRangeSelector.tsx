import React, { useState } from "react"
import {Button} from "@components/ui/button.tsx";

type TimeRange = "today" | "thisWeek" | "thisMonth"

interface TimeRangeSelectorProps {
    onChange?: (value: TimeRange) => void
    defaultValue?: TimeRange
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
                                                                 onChange,
                                                                 defaultValue = "today",
                                                             }) => {
    const [selected, setSelected] = useState<TimeRange>(defaultValue)

    const handleSelect = (value: TimeRange) => {
        setSelected(value)
        if (onChange) onChange(value)
    }

    const buttonClass = (value: TimeRange) =>
        `px-4 py-2 text-xs rounded-full border shadow-none  font-light ${
            selected === value
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-secondary border-border hover:bg-card"
        } transition-colors duration-150`

    return (
        <div className="flex gap-2">
            <Button size='sm' className={buttonClass("today")} onClick={() => handleSelect("today")}>
                Today
            </Button>
            <Button size='sm'
                className={buttonClass("thisWeek")}
                onClick={() => handleSelect("thisWeek")}
            >
                This Week
            </Button>
            <Button size='sm'
                className={buttonClass("thisMonth")}
                onClick={() => handleSelect("thisMonth")}
            >
                This Month
            </Button>
        </div>
    )
}

export default TimeRangeSelector
