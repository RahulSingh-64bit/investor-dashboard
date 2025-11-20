"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const valuationChange = "-37%";
  const isGBB = holding.code === "GBB";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8">
        <DialogHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <span>Portfolio</span>
            <span>›</span>
            <Badge variant="secondary" className="bg-green-200 text-success border-success/20">
              {holding.code}
            </Badge>
            <span>{holding.code} {isGBB ? "Green Brew Bond" : ""}</span>
          </div>
          <DialogTitle className="sr-only">Holding Details</DialogTitle>
        </DialogHeader>

        {/* MAIN GRID - Perfect balance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 mt-4">

          {/* LEFT COLUMN - Token Info */}
          <div className="space-y-8">

            {/* Token Header */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center text-green-600 text-2xl font-bold shrink-0">
                {holding.code.slice(0, 2)}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{holding.code}</h2>
                <p className="text-muted-foreground text-lg">
                  {isGBB ? "Green Brew Bond" : `${holding.code} Token`}
                </p>
              </div>
            </div>

            {/* Token Details Card */}
            <div className="bg-muted/50 rounded-2xl p-6 space-y-6">
              {/* Token Address */}
              <div className="flex justify-between items-start gap-4">
                <span className="text-sm text-muted-foreground min-w-[140px]">Token address</span>
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <span className="text-sm text-primary font-mono break-all text-right leading-relaxed">
                    0x582B2D043FB002be351...C38
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleCopy("0x582B2D043FB002be351C38", "address")}
                  >
                    {copiedField === "address" ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Rest of the fields - perfectly aligned */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Token status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-sm font-medium">Active</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Token symbol</span>
                  <span className="text-sm font-medium">{holding.code}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Token name</span>
                  <span className="text-sm font-medium">
                    {isGBB ? "Green Brew Bond" : `${holding.code} Token`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Valuation</span>
                  <span className="text-sm font-medium">{holding.valuationPerToken}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Valuation time</span>
                  <span className="text-sm">1 Jul 2024, 13:05:17</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Blockchain network</span>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-primary text-sm font-medium"
                    onClick={() => window.open("https://amoy.polygonscan.com/", "_blank")}
                  >
                    Amoy
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Instrument type</span>
                  <span className="text-sm font-medium">{holding.type}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Token standard</span>
                  <span className="text-sm font-medium">T-REX v3.1</span>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-muted/50 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-3">Documents</h3>
              <p className="text-sm text-muted-foreground">No documents available</p>
            </div>
          </div>

          {/* RIGHT COLUMN - Valuation Chart */}
          <div className="space-y-8">
            <div className="bg-muted/50 rounded-2xl p-6 lg:p-8">
              {/* Header + Date Pickers */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold">Valuation</h3>
                  <p className="text-3xl font-bold text-destructive mt-1">{valuationChange}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <div className="flex-1">
                    <Label htmlFor="start-date" className="text-xs font-medium">Start date</Label>
                    <Input
                      id="start-date"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="h-10 mt-1.5"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="end-date" className="text-xs font-medium">End date</Label>
                    <Input
                      id="end-date"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="h-10 mt-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="relative h-80 lg:h-96 bg-background/30 rounded-xl overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 350">
                  {/* Grid Lines */}
                  {[50, 100, 150, 200, 250, 300].map((y) => (
                    <line
                      key={y}
                      x1="60" y1={y} x2="740" y2={y}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-muted/20"
                    />
                  ))}

                  {/* Downward Trend Line */}
                  <polyline
                    points="60,60 160,90 260,120 360,155 460,190 560,225 660,255 740,290"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-12 pl-4 text-xs text-muted-foreground">
                  <span>US$50.00</span>
                  <span>US$45.00</span>
                  <span>US$40.00</span>
                  <span>US$35.00</span>
                  <span>US$30.00</span>
                  <span>US$25.00</span>
                  <span>US$20.00</span>
                </div>

                {/* X-Axis Labels */}
                <div className="absolute bottom-4 left-16 right-8 flex justify-between text-xs text-muted-foreground">
                  <span>15 Jun 2024</span>
                  <span className="hidden sm:inline">19 Jun</span>
                  <span className="hidden md:inline">23 Jun</span>
                  <span>27 Jun</span>
                  <span>1 Jul 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}