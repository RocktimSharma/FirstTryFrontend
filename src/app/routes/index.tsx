import {createBrowserRouter, Navigate} from "react-router-dom";


import LoginPage from "@features/auth/pages/LoginPage";
import RegisterPage from "@features/auth/pages/RegisterPage.tsx";
import AuthLayout from "@components/layout/AuthLayout.tsx";
import DashboardLayout from "@components/layout/DashboardLayout.tsx";
import HomePage from "@features/home/pages/HomePage.tsx";

import ProductCreatePage from "@features/Product/pages/create.tsx";
import TaxesPage from "@features/fms/taxes/pages";

import ProductsPage from "@features/Product/pages";
import TaxCreatePage from "@features/fms/taxes/pages/create.tsx";
import COAPage from "@features/fms/coa/pages";
import SetPasswordPage from "@features/auth/pages/SetPasswordPage.tsx";
import RootLayout from "@components/layout/RootLayout.tsx";
import OnboardingLayout from "@components/layout/OnboardingLayout.tsx";
import CompanyStep from "@features/onboard/pages/CompanyStep.tsx";

export const router = createBrowserRouter([
    {
    element: <RootLayout />, // Global wrapper for ALL routes
    children: [

    {
        element: <AuthLayout/>,   // no navbar/footer
        children: [
            {path: "login/*", element: <LoginPage/>},
            {path: "/signup", element: <RegisterPage/>},
            {path: "/set-password", element: <SetPasswordPage/>},

        ],
    },
        {
            path: "onboard",
            element: <OnboardingLayout />, // Setup wizard wrapper with stepper sidebar & progress bar
            children: [
                // Automatically redirect bare /onboard requests straight to the corporate setup card
                { index: true, element: <Navigate to="/onboard/company" replace /> },
                { path: "company", element: <CompanyStep /> },
                // { path: "profile", element: <DomainStep /> },
                // { path: "operations", element: <OperationsStep /> },
                // { path: "collaborators", element: <TeamStep /> },
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
            {
                path: "taxes",
                children: [
                    {index: true, element: <TaxesPage/>},
                    {path: "new", element: <TaxCreatePage/>},
                    // { path: ":id", element: <ProductDetailsPage /> },
                    // { path: ":id/edit", element: <ProductEditPage /> },
                ],
            },
            {
                path: "finance",
                children: [
                    {path:"coa", element: <COAPage/>},
                    // {path: "new", element: <TaxCreatePage/>},
                    // { path: ":id", element: <ProductDetailsPage /> },
                    // { path: ":id/edit", element: <ProductEditPage /> },
                ],
            },
            // dashboard/product routes go here
        ],
    },
]}]);
