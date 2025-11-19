import {SignedIn, SignedOut} from "@clerk/clerk-react";
import {Navigate, Outlet} from "react-router-dom";

export default function AuthLayout() {
    return (
        <>
            <SignedOut>
                {/* only show login/register when logged out */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-2 h-[100dvh] p-4 bg-card`}>
                    <div className={`bg-border rounded-2xl hidden md:block`}>

                    </div>

                    <Outlet/>

                </div>
            </SignedOut>

            <SignedIn>
                {/* if already logged in → redirect to dashboard */}
                <Navigate to="/" replace/>
            </SignedIn>
        </>
    );
}
