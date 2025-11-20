"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CheckCircle2,
  Circle,
  ArrowDownUp,
  Info,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateOrderDialog({ open, onOpenChange, holding }) {
  const [paymentMethod, setPaymentMethod] = useState("USDC");
  const [investmentType, setInvestmentType] = useState("token");
  const [tokenAmount, setTokenAmount] = useState(123);
  const [showProcessingFlow, setShowProcessingFlow] = useState(false);

  const pricePerToken = 10.0011058388;
  const totalPayable = tokenAmount * pricePerToken;

  const handleConfirmOrder = () => {
    setShowProcessingFlow(true);

    // Simulate processing → success after 5 seconds
    setTimeout(() => {
      toast.success("Order created successfully! 🎉", {
        description: "Your subscription is now active.",
        duration: 6000,
      });
      setShowProcessingFlow(false);
      onOpenChange(false);
    }, 5000);
  };

  const isGBB = holding.code === "GBB";
  const tokenName = isGBB ? "Green Brew Bond" : `${holding.code} Token`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 lg:p-8 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create subscription order
          </DialogTitle>
        </DialogHeader>

        {/* PROCESSING FLOW — EXACTLY LIKE YOUR IMAGE */}
        {showProcessingFlow ? (
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 mt-8">
            {/* Left Sidebar */}
            <div className="space-y-6">
              {/* Token Card */}
              <div className="bg-muted/50 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  {holding.code.slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-lg">{holding.code}</div>
                  <div className="text-sm text-muted-foreground">{tokenName}</div>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-success/10 border-l-4 border-success">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <span className="font-medium text-success">Qualification</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border-l-4 border-primary">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-primary">Create subscription order</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl opacity-70">
                  <Circle className="w-6 h-6 text-primary fill-current" />
                  <span className="font-medium">Payment</span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Payment Info Card */}
              <div className="bg-card border rounded-2xl p-6 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Further payment instructions have been sent to your email address:{" "}
                  <span className="font-semibold text-foreground">
                    barbara-investorappdemo@tokery.com
                  </span>
                  . Balance on your wallet will be updated as soon as payment is confirmed by the issuer.
                </p>

                <div className="space-y-5">
                  <div>
                    <Label className="text-sm text-muted-foreground">Amount to pay</Label>
                    <div className="text-2xl font-bold mt-1">
                      USDC {totalPayable.toFixed(6)}
                    </div>
                  </div>

                  <div>
                    <Label>From</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <code className="font-mono text-sm bg-muted px-4 py-3 rounded-lg flex-1 truncate">
                        0xc68cFcE83194B26a17f2767217c8c140b81025630
                      </code>
                      <Button size="icon" variant="ghost">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>To</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <code className="font-mono text-sm bg-muted px-4 py-3 rounded-lg flex-1 truncate">
                        0xCC5c52AF4B2d19AD15afB6B46983d8E4dc53C14
                      </code>
                      <Button size="icon" variant="ghost">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Payment network</Label>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                        <Circle className="w-4 h-4 fill-current" />
                        Anoy
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
                  <Info className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-orange-800">
                    Ensure the correct wallet and network are being used, as failure to do so may result in loss of funds.
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-card border rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-5">ORDER SUMMARY</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-orange-600 flex items-center gap-2 font-medium">
                      <Circle className="w-3 h-3 fill-current" /> Pending
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Number of tokens</span>
                    <span className="font-medium">{holding.code} 123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per token</span>
                    <span className="font-medium">USDC 10.0011058388</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net investment</span>
                    <span className="font-medium">USDC 1,230.13601756724</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-medium">USDC 0</span>
                  </div>
                  <div className="pt-4 border-t font-bold text-base">
                    Amount to pay: USDC 1,230.13601756724
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* YOUR ORIGINAL FORM — 100% UNCHANGED */
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 mt-6">
            {/* LEFT SIDEBAR - Steps & Token Info */}
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  {holding.code.slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-lg">{holding.code}</div>
                  <div className="text-sm text-muted-foreground">{tokenName}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-success/5">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <span className="font-medium">Qualification</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border-l-4 border-primary">
                  <Circle className="w-6 h-6 text-primary fill-current" />
                  <span className="font-semibold text-primary">Create subscription order</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl opacity-50">
                  <Circle className="w-6 h-6" />
                  <span className="font-medium">Payment</span>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-7">
                <div>
                  <Label className="text-base font-semibold mb-3 block">I want to pay with:</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs">◆</div>
                    My intended investment
                  </Label>
                  <RadioGroup value={investmentType} onValueChange={setInvestmentType}>
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="token" id="token" />
                        <Label htmlFor="token" className="font-medium cursor-pointer">by token amount</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="net" id="net" />
                        <Label htmlFor="net" className="font-medium cursor-pointer">by net invest</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-2 block">{holding.code} amount</Label>
                  <Input
                    type="number"
                    value={tokenAmount || ""}
                    onChange={(e) => setTokenAmount(Number(e.target.value) || 0)}
                    placeholder="0"
                    className="h-14 text-2xl font-medium text-right"
                  />
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-4">
                  <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The price of each token is <strong>{pricePerToken.toFixed(6)}</strong> {paymentMethod} and a minimum investment requirement is set at <strong>100 {holding.code}</strong>, equivalent to <strong>1,000 USD</strong>.
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-8">
                <div className="bg-muted/50 rounded-2xl p-6 space-y-6">
                  <div>
                    <Label className="text-sm text-muted-foreground">You get</Label>
                    <div className="text-3xl font-bold mt-1">{holding.code} {tokenAmount.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
                      <ArrowDownUp className="w-6 h-6 text-background" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">You pay</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {paymentMethod[0]}
                      </div>
                      <div className="font-semibold text-lg">
                        {paymentMethod} {totalPayable.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-semibold bg-foreground text-background hover:bg-foreground/90"
                  onClick={handleConfirmOrder}
                >
                  Confirm order
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>

                <div className="bg-muted/30 rounded-2xl p-6 space-y-4 border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Number of tokens</span>
                    <span className="font-semibold">{holding.code} {tokenAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per token</span>
                    <span className="font-semibold">{paymentMethod} {pricePerToken.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net investment</span>
                    <span className="font-semibold">{paymentMethod} {totalPayable.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-semibold">{paymentMethod} 0.00</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between text-lg font-bold">
                    <span>Amount to pay</span>
                    <span>{paymentMethod} {totalPayable.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}