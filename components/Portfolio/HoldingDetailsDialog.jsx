// src/components/Dialogs/HoldingDetailsDialog.jsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function HoldingDetailsDialog({ open, onOpenChange, holding }) {
  const [copiedField, setCopiedField] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-sm text-muted-foreground mb-4">
            Portfolio ›{" "}
            <Badge variant="secondary" className="bg-success/10 text-success">
              {holding.code}
            </Badge>{" "}
            {holding.code === "GBB" ? "Green Brew Bond" : ""}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Token Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-success rounded-xl flex-center text-white text-3xl font-bold">
                {holding.code.slice(0, 2)}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{holding.code}</h2>
                <p className="text-muted-foreground">
                  {holding.code === "GBB" ? "Green Brew Bond" : "Tokenized Asset"}
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Token address</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">0x582B2D043FB002be351...C38</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy("0x582B2D043FB002be351C38", "addr")}>
                    {copiedField === "addr" ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-success font-medium">Active</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Valuation</span>
                <span className="font-bold text-xl">{holding.valuationPerToken}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Balance</span>
                <span className="font-bold">{holding.balance} {holding.code}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Network</span>
                <Button variant="link" className="p-0 h-auto" onClick={() => window.open("https://amoy.polygonscan.com", "_blank")}>
                  Amoy <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Chart */}
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-sm text-muted-foreground">Valuation change</div>
                <div className="text-2xl font-bold text-destructive">-37%</div>
              </div>
              <div className="flex gap-3">
                <div>
                  <Label className="text-xs">Start</Label>
                  <Input placeholder="dd/mm/yyyy" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-9" />
                </div>
                <div>
                  <Label className="text-xs">End</Label>
                  <Input placeholder="dd/mm/yyyy" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-9" />
                </div>
              </div>
            </div>

            <div className="relative h-80">
              <svg className="w-full h-full" viewBox="0 0 800 320">
                {/* Simple downward trend */}
                <polyline
                  points="50,50 150,90 300,140 450,190 600,240 750,280"
                  fill="none"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}