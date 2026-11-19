import {Outlet} from "react-router-dom";


const RootLayout = () => {
    return (
        <>


            {/* Global things like Shadcn's <Toaster /> can also go here later */}
            <Outlet />
        </>
    );
};

export default RootLayout;