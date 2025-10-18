// nav-items.ts
import {
    Bell,
    Box,
    Calculator,

    ContactRound,
    FileText,
    Folder,
    House,
    IndianRupee,
    Percent, Plug, Settings, ShoppingCart, Sliders,
    Tag,
    TrendingUp,
    Truck,
    UserLock,
    Users,
    Warehouse
} from "lucide-react";
import type {SidebarItems} from "@/types/sidebar-items";

export const sidebarItems:  SidebarItems[] = [
    {
        group: "Dashboard",
        items: [
            { title: "Dashboard", url: "/", icon: <House strokeWidth={1} /> },
            { title: "Reports", url: "reports", icon: <TrendingUp strokeWidth={1} /> },
            { title: "Notifications", url: "notifications", icon: <Bell strokeWidth={1} /> },
        ],
    },
    {
        group: "Sales & Purchases",
        items: [
            { title: "Point of Sale", url: "pos", icon: <ShoppingCart strokeWidth={1} /> },
            { title: "Sales", url: "sales", icon: <TrendingUp strokeWidth={1} /> },
            { title: "Purchases", url: "purchases", icon: <TrendingUp strokeWidth={1} /> },
            { title: "Invoices", url: "invoices", icon: <FileText strokeWidth={1} /> },
            { title: "Purchase Orders", url: "purchase-orders", icon: <FileText strokeWidth={1} /> },
            { title: "Discounts", url: "discounts", icon: <Percent strokeWidth={1} /> },
        ],
    },
    {
        group: "Catalog",
        items: [
            { title: "Products", url: "products", icon: <Box strokeWidth={1} /> },
            { title: "Categories", url: "categories", icon: <Folder strokeWidth={1} /> },
            { title: "Brands", url: "brands", icon: <Tag strokeWidth={1} /> },
        ],
    },
    {
        group: "Inventory",
        items: [
            { title: "Inventory", url: "inventory", icon: <Warehouse strokeWidth={1} /> },
            { title: "Suppliers", url: "suppliers", icon: <Truck strokeWidth={1} /> },
            { title: "Low Stock Alerts", url: "low-stock", icon: <Bell strokeWidth={1} /> },
        ],
    },
    {
        group: "People",
        items: [
            { title: "Customers", url: "customers", icon: <Users strokeWidth={1} /> },
            { title: "Employees", url: "employees", icon: <ContactRound strokeWidth={1} /> },
            { title: "Admins", url: "admins", icon: <UserLock strokeWidth={1} /> },
        ],
    },
    {
        group: "Financials",
        items: [
            { title: "Finances", url: "finances", icon: <IndianRupee strokeWidth={1} /> },
            { title: "Taxes", url: "taxes", icon: <Calculator strokeWidth={1} /> },
            { title: "Expenses", url: "expenses", icon: <FileText strokeWidth={1} /> },
        ],
    },
    {
        group: "Settings",
        items: [
            { title: "Company Info", url: "settings/company", icon: <Settings strokeWidth={1} /> },
            { title: "User Roles", url: "settings/roles", icon: <Users strokeWidth={1} /> },
            { title: "Preferences", url: "settings/preferences", icon: <Sliders strokeWidth={1} /> },
        ],
    },
    {
        group: "More",
        items: [
            { title: "Integrations", url: "settings/integrations", icon: <Plug strokeWidth={1} /> },
            { title: "Audit Logs", url: "settings/logs", icon: <FileText strokeWidth={1} /> },
        ],
    },
];
