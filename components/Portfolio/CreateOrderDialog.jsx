// src/components/Dialogs/CreateOrderDialog.jsx
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
import { CheckCircle2, Circle, ArrowDownUp, Info, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function CreateOrderDialog({ open, onOpenChange, holding }) {
  const [paymentMethod, setPaymentMethod] = useState("USDC");
  const [investmentType, setInvestmentType] = useState("token");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [blockedTokens, setBlockedTokens] = useState(0);
  const [unblockedTokens, setUnblockedTokens] = useState(0);

  const pricePerToken = 10.001105;
  const minInvestment = 100;
  const minInvestmentUSD = 1000;

  const handleConfirmOrder = () => {
    if (tokenAmount < minInvestment) {
      toast.error(`Minimum investment is ${minInvestment} tokens`);
      return;
    }
    toast.success("Order created successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Create subscription order</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
          {/* Left Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="w-14 h-14 bg-success rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                {holding.code.slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-lg">{holding.code}</div>
                <div className="text-sm text-muted-foreground">
                  {holding.code === "GBB" ? "Green Brew Bond" : `${holding.code} Token`}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <span className="font-medium">Qualification</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                <Circle className="w-6 h-6 text-primary fill-primary" />
                <span className="font-medium">Create subscription order</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg opacity-50">
                <Circle className="w-6 h-6" />
                <span>Payment</span>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">I want to pay with:</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center text-white text-xs">◆</span>
                  My intended investment
                </Label>
                <RadioGroup value={investmentType} onValueChange={setInvestmentType}>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="token" />
                      <span>by token amount</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="net" />
                      <span>by net invest</span>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>{holding.code} Amount</Label>
                <Input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(Math.max(0, Number(e.target.value)))}
                  placeholder="0"
                  className="text-right text-lg font-medium"
                />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
                <Info className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm">
                  Price per token: <strong>{pricePerToken} {paymentMethod}</strong>
                  <br />
                  Minimum investment: <strong>{minInvestment} {holding.code}</strong> = <strong>{minInvestmentUSD} USD</strong>
                </p>
              </div>
            </div>

            {/* Right Side - Summary */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-4">
                  {holding.code} {tokenAmount || 0}
                </div>
                <div className="w-12 h-12 mx-auto rounded-full bg-foreground flex items-center justify-center">
                  <ArrowDownUp className="w-6 h-6 text-background" />
                </div>
                <div className="mt-4 text-xl font-medium">
                  {paymentMethod} {(tokenAmount * pricePerToken).toFixed(2)}
                </div>
              </div>

              {/* Block / Unblock */}
              <div className="flex items-center justify-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setBlockedTokens(Math.max(0, blockedTokens - 1))}>
                  −
                </Button>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-destructive flex-center text-destructive-foreground text-xs">Locked</div>
                  <span className="font-bold text-lg">{blockedTokens}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setBlockedTokens(blockedTokens + 1)}>
                  +
                </Button>

                <Button variant="ghost" size="icon" onClick={() => setUnblockedTokens(Math.max(0, unblockedTokens - 1))}>
                  −
                </Button>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-success flex-center text-success-foreground text-xs">Unlocked</div>
                  <span className="font-bold text-lg text-success">{unblockedTokens}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setUnblockedTokens(unblockedTokens + 1)}>
                  +
                </Button>
              </div>

              <Button
                size="lg"
                className="w-full h-14 text-lg bg-foreground text-background hover:bg-foreground/90"
                onClick={handleConfirmOrder}
              >
                Confirm order
                <ArrowRight className="ml-2" />
              </Button>

              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tokens</span>
                  <span className="font-medium">{tokenAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per token</span>
                  <span>{pricePerToken.toFixed(6)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t">
                  <span>Total to pay</span>
                  <span>{paymentMethod} {(tokenAmount * pricePerToken).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}