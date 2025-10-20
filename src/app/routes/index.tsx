import {createBrowserRouter} from "react-router-dom";


import LoginPage from "@features/auth/pages/LoginPage";
import RegisterPage from "@features/auth/pages/RegisterPage.tsx";
import AuthLayout from "@components/layout/AuthLayout.tsx";
import DashboardLayout from "@components/layout/DashboardLayout.tsx";
import HomePage from "@features/home/pages/HomePage.tsx";

import ProductCreatePage from "@features/Product/pages/create.tsx";
import ProductsPage from "@features/Product/pages";

export const router = createBrowserRouter([
    {
        element: <AuthLayout/>,   // no navbar/footer
        children: [
            {path: "/login", element: <LoginPage/>},
            {path: "/register", element: <RegisterPage/>},
        ],
    },
    {
        element: <DashboardLayout/>,   // with navbar/footer
        children: [
            {path: "/", element: <HomePage/>},
            {
                path: "products",
                children: [
                    {index: true, element: <ProductsPage/>},               // /products
                    {path: "new", element: <ProductCreatePage/>},          // /products/new
                    // { path: ":id", element: <ProductDetailsPage /> },         // /products/:id
                    // { path: ":id/edit", element: <ProductEditPage /> },       // /products/:id/edit
                ],
            },
            // dashboard/product routes go here
        ],
    },
]);
