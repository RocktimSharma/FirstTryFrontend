import {useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {ChevronDown, ChevronRight, ChevronsUpDown, Filter, Lock, MoreHorizontal} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SearchBar} from "@components/common/SearchBar.tsx";
import {COAFilters} from "@features/fms/coa/components/COAFilters.tsx";
import {PrimaryButton} from "@components/common/PrimaryButton.tsx";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@components/ui/sheet.tsx";
import AccountForm from "@features/fms/coa/forms/account-form.tsx";

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


            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center flex-1 gap-2">
                    <SearchBar
                        placeholder="Search by account name or code..."
                        containerClassName="max-w-md"
                    />

                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-9 px-3"
                        onClick={toggleAllAccounts}
                    >
                        <ChevronsUpDown className="mr-2 h-4 w-4" />
                        {Object.keys(expanded).length > 0 ? "Collapse" : "Expand"}
                    </Button>

                    {/* Integrated Dropdown */}
                    <COAFilters />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <PrimaryButton label={"Create Account"}></PrimaryButton></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                New Ledger Account
                            </SheetTitle>

                            <SheetDescription>
                                Create and manage ledger accounts.
                            </SheetDescription>
                        </SheetHeader>
                        <div className={'px-4'}>
                            <AccountForm parentAccounts={allAccounts}/>
                        </div>

                    </SheetContent>
                </Sheet>

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