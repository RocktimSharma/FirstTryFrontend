import { RouterProvider } from "react-router-dom";
import { router } from "@app/routes";


import "@assets/styles/App.css";
import {ThemeProvider} from "@/providers/theme-provider.tsx";

function App() {
    return (
        <ThemeProvider
            defaultTheme="dark"
            storageKey="vite-ui-theme"
        >
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;