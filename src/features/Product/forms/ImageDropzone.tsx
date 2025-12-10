import {useRef} from 'react';
import {ImageUp} from "lucide-react";

const ImageDropzone = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onInputChange = () => {
        console.log("Clicked")
    }
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    return (
        <div onClick={handleClick} className="relative w-full h-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center hover:border-indigo-400 transition"
        >
            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={onInputChange}
                className="hidden"
            />
            <div className={'flex flex-col justify-center items-center m-4 text-center gap-1 text-secondary'}>
                <ImageUp strokeWidth={1} />
                <p className={'block text-xs'}><span className={'underline text-accent'}>Click to upload</span> or drag or drop</p>
            </div>

        </div>
    );
};

export default ImageDropzone;