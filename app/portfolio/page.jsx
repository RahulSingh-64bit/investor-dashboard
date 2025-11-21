
"use client";         

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wallet } from "lucide-react";

import HoldingsTable from "@/components/Portfolio/HoldingsTable";
import TransferRequestsTable from "@/components/Portfolio/TransferRequestsTable";
import TransactionsTable from "@/components/Portfolio/TransactionsTable";

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("holdings");

  // Sample data 
  const holdings = [
    {
    id: 1,
    code: "ACP",
    balance: "34.532413",
    valuationPerToken: "US$10.43",
    valuation: "US$360.18",
    type: "DEBT",
    wallet: "0xc28RfCE83948...b630",
    blocked: 0,
    unblocked: 100,
  },
  {
    id: 2,
    code: "SCR",
    balance: "34.532413",
    valuationPerToken: "US$10.43",
    valuation: "US$360.18",
    type: "DEBT",
    wallet: "0xc28RfCE83948...b630",
    blocked: 0,
    unblocked: 100,
  },
  {
    id: 3,
    code: "USP",
    balance: "34.532413",
    valuationPerToken: "US$10.43",
    valuation: "US$360.18",
    type: "DEBT",
    wallet: "0xc28RfCE83948...b630",
    blocked: 0,
    unblocked: 100,
  },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
        Portfolio
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 md:mb-6 w-full md:w-auto flex flex-wrap h-auto gap-2">
          <TabsTrigger value="holdings" className="flex items-center gap-2 flex-1 md:flex-initial">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Holdings</span>
            <span className="sm:hidden">Hold</span>
          </TabsTrigger>

          <TabsTrigger value="transfer" className="flex-1 md:flex-initial">
            <span className="hidden sm:inline">Transfer requests</span>
            <span className="sm:hidden">Transfer</span>
          </TabsTrigger>

          <TabsTrigger value="transactions" className="flex-1 md:flex-initial">
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="bg-card rounded-lg border border-border p-4 md:p-6">
          <HoldingsTable holdings={holdings} />
        </TabsContent>

        <TabsContent value="transfer" className="bg-card rounded-lg border border-border p-4 md:p-6">
          <TransferRequestsTable />
        </TabsContent>

        <TabsContent value="transactions" className="bg-card rounded-lg border border-border p-4 md:p-6">
          <TransactionsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}