
import { RouterProvider } from "react-router-dom";
import { router } from "@app/routes";
import '@assets/styles/App.css'
function App() {


    return <RouterProvider router={router} />;
}

export default App
