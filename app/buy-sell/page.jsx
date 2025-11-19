// src/app/buy-sell/page.jsx
"use client"; // Required: useState + form + toast

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function BuySellPage() {
  const [tradeType, setTradeType] = useState("buy");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAsset || !amount || Number(amount) <= 0) {
      toast.error("Please select an asset and enter a valid amount");
      return;
    }

    toast.success(
      `${tradeType === "buy" ? "Buy" : "Sell"} order placed successfully!`,
      {
        description: `${amount} USD for ${selectedAsset}`,
      }
    );

    // Optional: reset form
    setAmount("");
    setSelectedAsset("");
  };

  const assets = [
    { code: "GBB", name: "Green Brew Bond" },
    { code: "SCR", name: "Stellar Cash Reserve" },
    { code: "ACP", name: "Apex Capital Partners" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8">Buy / Sell</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Place Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Buy / Sell Toggle */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={tradeType === "buy" ? "default" : "outline"}
                size="lg"
                className="font-medium"
                onClick={() => setTradeType("buy")}
              >
                Buy
              </Button>
              <Button
                type="button"
                variant={tradeType === "sell" ? "default" : "outline"}
                size="lg"
                className="font-medium"
                onClick={() => setTradeType("sell")}
              >
                Sell
              </Button>
            </div>

            {/* Asset Selector */}
            <div className="space-y-2">
              <Label htmlFor="asset">Select Asset</Label>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Choose an asset" />
                </SelectTrigger>
                <SelectContent>
                  {assets.map((asset) => (
                    <SelectItem key={asset.code} value={asset.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{asset.code}</span>
                        <span className="text-muted-foreground">— {asset.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g. 1500.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                className="text-lg"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full text-lg font-medium"
              disabled={!selectedAsset || !amount || Number(amount) <= 0}
            >
              Place {tradeType === "buy" ? "Buy" : "Sell"} Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}