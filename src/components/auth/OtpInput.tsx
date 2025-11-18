import { useRef } from "react";

interface OtpInputProps {
    value: string[];
    onChange: (value: string[]) => void;
}

const OtpInput = ({ value, onChange }: OtpInputProps) => {
    const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

    const handleChange = (index: number, num: string) => {
        if (!/^[0-9]?$/.test(num)) return; // only digits

        const newOtp = [...value];
        newOtp[index] = num;
        onChange(newOtp);

        // Move to next box if user typed a number
        if (num && index < 5) {
            refs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !value[index] && index > 0) {
            refs[index - 1].current?.focus();
        }
    };

    return (
        <div className="flex gap-2">
            {value.map((digit, index) => (
                <input
                    key={index}
                    ref={refs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="bg-background w-12 h-12 text-center text-xl rounded-md border focus-visible:border-accent"
                />
            ))}
        </div>
    );
};

export default OtpInput;
