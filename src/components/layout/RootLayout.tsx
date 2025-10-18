import {Outlet} from "react-router-dom";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

const RootLayout = () => {
    return (
        <div>
            <header>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
            <Outlet/>
        </div>
    );
};

export default RootLayout;