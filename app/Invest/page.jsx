// src/app/invest/page.jsx
"use client";                          // ← Add this at the top!

import { useState } from "react";
import InvestmentCard from "@/components/Invest/InvestmentCard";
import CreateOrderDialog from "@/components/Portfolio/CreateOrderDialog";
  // ← ADD

export default function InvestPage() {
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);     // ← ADD
  const [selectedHolding, setSelectedHolding] = useState(null);      // ← ADD
  const investments = [
    {
      code: "SCR",
      name: "Stellar Cash Reserve",
      type: "Fund",
      description: "Stellar Cash Reserve - bridging the traditional and digital financial realms",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      status: "Open",
      qualified: false,
      details: [
        { label: "Start date", value: "21 Nov 2023" },
        { label: "End date", value: "20 Dec 2027" },
      ],
    },
    {
      code: "ACP",
      name: "Apex Capital Partners",
      type: "Fund",
      description: "Apex Capital Partners - where opportunity meets innovation",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      status: "Open",
      qualified: false,
      details: [
        { label: "Start date", value: "1 Nov 2023" },
        { label: "End date", value: "30 Nov 2035" },
      ],
    },
    {
      code: "GBB",
      name: "Green Brew Bond",
      type: "Debt",
      description: "Green Brew Bond is a tokenized debt instrument designed to support sustainable coffee",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
      status: "Open",
      qualified: true,
      details: [
        { label: "Token price", value: "US$10" },
        { label: "Start date", value: "20 May 2024" },
        { label: "End date", value: "21 May 2028" },
        { label: "Min. investment", value: "US$1,000" },
      ],
    },
  ];

const handleOpenOrder = (investment) => {
    setSelectedHolding(investment);
    setOrderDialogOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* your existing h1 and grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <div key={investment.code} onClick={() => handleOpenOrder(investment)} className="cursor-pointer">
            <InvestmentCard {...investment} />
          </div>
        ))}
      </div>

      {/* ← ADD THIS DIALOG */}
      {selectedHolding && (
        <CreateOrderDialog
          open={orderDialogOpen}
          onOpenChange={setOrderDialogOpen}
          holding={{
            code: selectedHolding.code,
            valuationPerToken: selectedHolding.details.find(d => d.label.includes("price"))?.value || "US$10.00"
          }}
        />
      )}
    </div>
  );
}