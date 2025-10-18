import {Outlet} from "react-router-dom";

export default function AuthLayout() {
    return (
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-2 h-[100dvh] bg-red-50 p-4`}>
                <div className={`bg-border rounded-2xl`}>

                </div>

                    <Outlet />

            </div>


    );
}
