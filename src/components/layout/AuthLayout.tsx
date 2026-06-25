
import {Navigate, Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import {ThemeToggle} from "@components/common/theme-toggle.tsx";


const images = [
    "/images/banner-1.png",
    "/images/banner-2.png",
    "/images/banner-3.png",
    "/images/banner-4.png",
];

export default function AuthLayout() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000); // change every 4s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] h-[100dvh]">
            {/* Left image section */}
            <div className="relative hidden lg:block overflow-hidden">
                {images.map((img, index) => (
                    <img
                        key={img}
                        src={img}
                        alt=""
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                            index === currentImage ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-10 left-10 text-white z-10">
                    <h1 className="text-4xl font-bold">UNIM</h1>
                    <p className="mt-2 text-lg">
                        Manage your workflow efficiently.
                    </p>
                </div>
            </div>

            {/* Right section */}
            <div className="relative flex flex-col h-full">
                <div className="absolute top-4 right-4 z-20">
                    <ThemeToggle />
                </div>

                {/* Center content */}
                <div className="flex-1 flex items-center justify-center px-6">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>

                {/* Footer pinned to bottom */}
                <div className="border-t px-6 py-4 mt-auto">
                    <div className="flex justify-between items-center gap-3">
                        <p className="text-fg-quaternary text-xs">
                            © 2026 UNIM
                        </p>
                        <div className="flex gap-6">
                            <a
                                className="text-quaternary text-xs transition hover:text-primary"
                                href="/privacy"
                            >
                                Privacy
                            </a>
                            <a
                                className="text-quaternary text-xs transition hover:text-primary"
                                href="/terms"
                            >
                                Terms
                            </a>
                            <a
                                className="text-quaternary text-xs transition hover:text-primary"
                                href="/support"
                            >
                                Support
                            </a>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );


}
