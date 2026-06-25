import {useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {ChevronDown, ChevronRight, ChevronsUpDown, Filter, Lock, MoreHorizontal} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SearchBar} from "@components/common/SearchBar.tsx";
import {COAFilters} from "@features/fms/coa/components/COAFilters.tsx";
import {PrimaryButton} from "@components/common/PrimaryButton.tsx";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@components/ui/sheet.tsx";
import AccountForm from "@features/fms/coa/forms/account-form.tsx";
import {OutlinedButton} from "@components/common/OutlinedButton.tsx";
import {BiExport, BiPlus} from "react-icons/bi";

const sampleAccounts = [
    {
        id: "1",
        code: "1000",
        name: "Assets",
        type: "ASSET",
        balance: 500000,
        isSystem: true,
        children: [
            {
                id: "2",
                code: "1100",
                name: "Cash & Bank",
                type: "ASSET",
                balance: 450000,
                isSystem: true,
                children: [
                    {
                        id: "3",
                        code: "1101",
                        name: "SBI Current Account",
                        type: "ASSET",
                        balance: 400000,
                        isSystem: false
                    },
                    {id: "4", code: "1102", name: "Petty Cash", type: "ASSET", balance: 50000, isSystem: true},
                ],
            },
        ],
    },
    {
        id: "5",
        code: "4000",
        name: "Revenue",
        type: "REVENUE",
        balance: 1200000,
        isSystem: true,
        children: [
            {id: "6", code: "4100", name: "Product Sales", type: "REVENUE", balance: 1000000, isSystem: true},
            {id: "7", code: "4200", name: "Service Income", type: "REVENUE", balance: 200000, isSystem: false},
        ],
    },
];
const COAPage = () => {
    const [tab, setTab] = useState<"all" | "asset" | "liability" | "equity" | "revenue" | "expense">('all');
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded(prev => ({...prev, [id]: !prev[id]}));
    };
    const getAllParentIds = (accounts: any[]): string[] => {
        let ids: string[] = [];
        accounts.forEach(acc => {
            if (acc.children && acc.children.length > 0) {
                ids.push(acc.id);
                ids.push(...getAllParentIds(acc.children));
            }
        });
        return ids;
    };
    const flattenAccounts = (accounts: any[]): any[] => {
        let result: any[] = [];

        accounts.forEach((account) => {
            result.push(account);

            if (account.children) {
                result = result.concat(flattenAccounts(account.children));
            }
        });

        return result;
    };

    const toggleAllAccounts = () => {
        const allParentIds = getAllParentIds(sampleAccounts);

        // If some are already expanded, collapse all. Otherwise, expand all.
        const isAnyExpanded = Object.values(expanded).some(val => val === true);

        if (isAnyExpanded) {
            setExpanded({}); // Collapse all
        } else {
            const newExpandedState: Record<string, boolean> = {};
            allParentIds.forEach(id => {
                newExpandedState[id] = true;
            });
            setExpanded(newExpandedState); // Expand all
        }
    };
    // --- Recursive Tree Row ---
    const TreeRow = ({account, level = 0}: { account: any, level: number }) => {
        const isExpanded = expanded[account.id];
        const hasChildren = account.children && account.children.length > 0;

        return (
            <>
                <TableRow className="group">
                    <TableCell style={{paddingLeft: `${level * 24 + 12}px`}} className="font-medium">
                        <div className="flex items-center gap-2">
                            {hasChildren ? (
                                <button onClick={() => toggleExpand(account.id)}>
                                    {isExpanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                                </button>
                            ) : (
                                <div className="w-4"/>
                            )}
                            <span className="text-muted-foreground text-xs font-mono">{account.code}</span>
                            {account.name}
                            {account.isSystem && <Lock size={12} className="text-muted-foreground"/>}
                        </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{account.type}</Badge></TableCell>
                    <TableCell className="text-right">₹{account.balance.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><MoreHorizontal size={16}/></Button>
                    </TableCell>
                </TableRow>
                {hasChildren && isExpanded && (
                    account.children.map((child: any) => (
                        <TreeRow key={child.id} account={child} level={level + 1}/>
                    ))
                )}
            </>
        );
    };
    const allAccounts = flattenAccounts(sampleAccounts);

    return (
        <div className="space-y-4">

            {/* 1. Changed container to flex-col on mobile, flex-row on desktop */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">

                {/* 2. Controls wrapper: column on mobile, row on desktop */}
                <div className="flex gap-2 items-center justify-between">

                    {/* Search bar takes full width on mobile, max-w-md on desktop */}
                    <SearchBar
                        placeholder="Search by account name or code..."
                        className="flex-1"
                    />

                    {/* 3. Action buttons group: side-by-side on mobile, native flow on desktop */}
                    <div className="flex items-center gap-2">

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleAllAccounts}
                            className="h-9 w-9 p-0 sm:w-auto sm:px-3 text-xs"
                        >
                            <ChevronsUpDown />
                            <span className="hidden sm:inline">{Object.keys(expanded).length > 0 ? "Collapse" : "Expand"}</span>

                        </Button>

                        {/* Integrated Dropdown fits cleanly here */}

                            <COAFilters />

                    </div>
                </div>

                {/* 4. Primary CTA: Sticky full width on mobile, auto width on desktop */}
                <div className="w-full sm:w-auto flex gap-2 ">
                    <OutlinedButton label={"Export"} icon={BiExport} className={'flex-1 sm:flex-auto'}/>
                    <Sheet>
                        <SheetTrigger asChild>
                            {/* Ensure your PrimaryButton component accepts a full-width className if needed */}
                            <PrimaryButton label={"Create Account"}  icon={BiPlus} className={'flex-1 sm:flex-auto'}/>
                        </SheetTrigger>

                        <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
                            <SheetHeader className="px-6 pt-6">
                                <SheetTitle>New Ledger Account</SheetTitle>
                                <SheetDescription>Create and manage ledger accounts.</SheetDescription>
                            </SheetHeader>

                            {/* Scrolling Form Body */}
                            <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
                                <AccountForm parentAccounts={allAccounts}/>
                            </div>

                            {/* Sticky Sheet Footer */}
                            <SheetFooter className="p-6 border-t bg-gray-50/50 sm:bg-transparent">
                                <Button
                                    type="submit"
                                    form="account-form"
                                    className="w-full bg-primary text-primary-foreground sm:w-auto"
                                >
                                    Save Account
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <Tabs value={tab}
                  onValueChange={(v) => setTab(v as "all" | "asset" | "liability" | "equity" | "revenue" | "expense")}>
                <TabsList variant={'line'}>
                    <TabsTrigger value="all" className="gap-2">
                        All
                    </TabsTrigger>
                    <TabsTrigger value="asset" className="gap-2">
                        Asset
                    </TabsTrigger>
                    <TabsTrigger value="liability" className="gap-2">
                        Liability
                    </TabsTrigger>
                    <TabsTrigger value="equity" className="gap-2">
                        Equity
                    </TabsTrigger>
                    <TabsTrigger value="revenue" className="gap-2">
                        Revenue
                    </TabsTrigger>
                    <TabsTrigger value="expense" className="gap-2">
                        Expense
                    </TabsTrigger>
                </TabsList>
            </Tabs>


            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[400px]">Account Name & Code</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            sampleAccounts.map(acc => <TreeRow key={acc.id} account={acc} level={0}/>)
                        }

                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default COAPage;