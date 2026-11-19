// nav-items.ts
import {
    Bell,
    BookOpen,
    Box,
    ChartArea,
    ContactRound,
    FileText,
    Folder,
    House,
    IndianRupee,
    Layers,
    ListTree,
    Logs,
    Percent,
    Plug,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Sliders,
    Tag,
    TrendingUp,
    Truck,
    UserLock,
    Users,
    Warehouse,
    LayoutDashboard,
    ScanBarcode,
    ReceiptText,
    RotateCcw,
    Wallet,
    Package,
    Boxes,
    ArrowLeftRight,
    ClockAlert,
    BookUser,
    BarChart3,
    Store,

    FileSliders,
    CreditCard,
} from "lucide-react";
import type {SidebarItems} from "@/types/sidebar-items";

export const sidebarItems: SidebarItems[] = [

    {
        group: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: <LayoutDashboard size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager"],
            },
        ],
    },
    {
        group: "Counter & Billing",
        items: [
            {
                title: "POS Billing",
                url: "/pos",
                icon: <ScanBarcode size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager", "cashier"],
            },
            {
                title: "Sales & Invoices",
                url: "/sales",
                icon: <ReceiptText size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager", "cashier"],
            },
            {
                title: "Returns & Refunds",
                url: "/returns",
                icon: <RotateCcw size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager", "cashier"],
            },
            {
                title: "Cash Register",
                url: "/cash-register",
                icon: <Wallet size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager", "cashier"],
            },
        ],
    },
    {
        group: "Inventory & Stock",
        items: [
            {
                title: "Products",
                url: "/products",
                icon: <Package size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager"],
            },
            {
                title: "Branch Inventory",
                url: "/inventory",
                icon: <Boxes size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager", "cashier"],
            },
            {
                title: "Stock Transfers",
                url: "/stock-transfers",
                icon: <ArrowLeftRight size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager"],
            },
            {
                title: "Batches & Expiry",
                url: "/batches",
                icon: <ClockAlert size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager"],
            },
        ],
    },
    {
        group: "Customers & Finance",
        items: [
            {
                title: "Customers & Udhar",
                url: "/customers",
                icon: <BookUser size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager", "cashier"],
            },
            {
                title: "Expenses",
                url: "/expenses",
                icon: <ReceiptText size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager"],
            },
            {
                title: "Reports & GST",
                url: "/reports",
                icon: <BarChart3 size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager"],
            },
        ],
    },
    {
        group: "Store & Admin",
        items: [
            {
                title: "Branches",
                url: "/branches",
                icon: <Store size={18} strokeWidth={1.5}/>,
                roles: ["owner"],
            },
            {
                title: "Staff & RBAC",
                url: "/users",
                icon: <Users size={18} strokeWidth={1.5}/>,
                roles: ["owner", "manager"],
            },
            {
                title: "Invoice & Format Settings",
                url: "/settings/format",
                icon: <FileSliders size={18} strokeWidth={1.5}/>,
                roles: ["owner"],
            },
            {
                title: "Subscription & Plan",
                url: "/settings/billing",
                icon: <CreditCard size={18} strokeWidth={1.5}/>,
                roles: ["owner"],
            },
        ],
    },


//     {
//         group: "Dashboard",
//         items: [
//             {title: "Dashboard", url: "/", icon: <House size={18} strokeWidth={1.5}/>},
//             {title: "Reports", url: "reports", icon: <ChartArea size={18} strokeWidth={1.5}/>},
//             {title: "Notifications", url: "notifications", icon: <Bell size={18} strokeWidth={1.5}/>},
//         ],
//     },
//     {
//         group: "Sales & Purchases",
//         items: [
//             {title: "Point of Sale", url: "pos", icon: <ShoppingCart size={18} strokeWidth={1.5}/>},
//             {title: "Sales", url: "sales", icon: <TrendingUp size={18} strokeWidth={1.5}/>},
//             {title: "Purchases", url: "purchases", icon: <ShoppingBag size={18} strokeWidth={1.5}/>},
//             {title: "Invoices", url: "invoices", icon: <FileText size={18} strokeWidth={1.5}/>},
//             // { title: "Purchase Orders", url: "purchase-orders", icon: <FileText size={18} strokeWidth={1.5} /> },
//             {title: "Discounts", url: "discounts", icon: <Percent size={18} strokeWidth={1.5}/>},
//         ],
//     },
//     {
//         group: "Catalog",
//         items: [
//             {title: "Products", url: "products", icon: <Box size={18} strokeWidth={1.5}/>},
//             {title: "Categories", url: "categories", icon: <Folder size={18} strokeWidth={1.5}/>},
//             {title: "Brands", url: "brands", icon: <Tag size={18} strokeWidth={1.5}/>},
//         ],
//     },
//     {
//         group: "Inventory",
//         items: [
//             {title: "Inventory", url: "inventory", icon: <Warehouse size={18} strokeWidth={1.5}/>},
//             {title: "Suppliers", url: "suppliers", icon: <Truck size={18} strokeWidth={1.5}/>},
//             {title: "Low Stock Alerts", url: "low-stock", icon: <Bell size={18} strokeWidth={1.5}/>},
//         ],
//     },
//     {
//         group: "People",
//         items: [
//             {title: "Customers", url: "customers", icon: <Users size={18} strokeWidth={1.5}/>},
//             {title: "Employees", url: "employees", icon: <ContactRound size={18} strokeWidth={1.5}/>},
//             {title: "Admins", url: "admins", icon: <UserLock size={18} strokeWidth={1.5}/>},
//         ],
//     },
// // Replace your Financials group with this:
//     {
//         group: "Accounting & Finance",
//         items: [
//             // The core "Buckets"
//             {title: "Chart of Accounts", url: "finance/coa", icon: <ListTree size={18} strokeWidth={1.5}/>},
//
//             // Daily operations
//             {title: "Expenses", url: "expenses", icon: <FileText size={18} strokeWidth={1.5}/>},
//             {title: "Taxes", url: "taxes", icon: <Percent size={18} strokeWidth={1.5}/>},
//
//             // Large scale accounting needs
//             {title: "Journal Entries", url: "journals", icon: <BookOpen size={18} strokeWidth={1.5}/>},
//
//             {title: "Dimensions", url: "dimensions", icon: <Layers size={18} strokeWidth={1.5}/>},
//
//             // Money moving in/out
//             {title: "Banking", url: "banking", icon: <IndianRupee size={18} strokeWidth={1.5}/>},
//         ],
//     },
//     {
//         group: "Settings",
//         items: [
//             {title: "Company Info", url: "settings/company", icon: <Settings size={18} strokeWidth={1.5}/>},
//             {title: "User Roles", url: "settings/roles", icon: <Users size={18} strokeWidth={1.5}/>},
//             {title: "Preferences", url: "settings/preferences", icon: <Sliders size={18} strokeWidth={1.5}/>},
//         ],
//     },
//     {
//         group: "More",
//         items: [
//             {title: "Integrations", url: "settings/integrations", icon: <Plug size={18} strokeWidth={1.5}/>},
//             {title: "Audit Logs", url: "settings/logs", icon: <Logs size={18} strokeWidth={1.5}/>},
//         ],
//     },
];
