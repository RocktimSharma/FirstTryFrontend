import { useRef, useState } from "react";

export default function ImageDropzone() {
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);

    const handleFiles = (selectedFiles) => {
        const fileArray = Array.from(selectedFiles).filter(file =>
            file.type.startsWith("image/")
        );
        setFiles(fileArray);
    };

    const onInputChange = (e) => {
        handleFiles(e.target.files);
    };

    const onDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const clearFiles = () => {
        setFiles([]);
        if (inputRef.current) {
            inputRef.current.value = ""; // ✅ real reset
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-lg space-y-4">

                {/* Dropzone */}
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    onClick={() => inputRef.current.click()}
                    tabIndex={0}
                    onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") && inputRef.current.click()
                    }
                    className="relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 text-center transition hover:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 min-h-[200px] flex items-center justify-center"
                >
                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={onInputChange}
                        className="hidden"
                    />

                    {/* ✅ CONTENT SWITCHES IN PLACE */}
                    {files.length === 0 ? (
                        <div className="text-center">
                            <p className="text-slate-700 font-medium">
                                Drag & drop images here, or{" "}
                                <span className="text-indigo-600 underline">browse</span>
                            </p>
                            <p className="text-sm text-slate-400 mt-1">
                                JPG, PNG, WEBP supported
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 w-full">
                            {files.map((file, index) => (
                                <div key={index} className="relative w-full h-40">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-full object-cover rounded-lg"
                                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={clearFiles}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Clear
                    </button>

                    <button
                        type="button"
                        onClick={() => alert(`Uploading ${files.length} file(s)`)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Upload
                    </button>
                </div>

            </div>
        </div>
    );
}
